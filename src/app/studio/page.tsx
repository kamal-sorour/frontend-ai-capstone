'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { StopCircle, Send, Loader2, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';

const MAX_INPUT_LENGTH = 2000;

export default function ChatInterface() {
  const [input, setInput] = useState('');

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || trimmedInput.length > MAX_INPUT_LENGTH || isLoading) return;

    sendMessage({ text: trimmedInput });
    setInput('');
  };

  return (
    // تم استخدام h-[80dvh] لحل مشاكل Mobile Safari
    <div className="flex flex-col h-[80dvh] max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Chat Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        
        {/* 1. Designed Empty State (Onboarding) */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
              <Send className="w-6 h-6 text-blue-500 ml-1" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">Ready for your technical interview?</h2>
            <p className="text-gray-500 mb-8 max-w-md text-sm">No conversation history yet. Start by typing a topic, or try one of these common frontend questions:</p>
            
            <div className="flex flex-col gap-3 w-full max-w-sm">
              <button 
                onClick={() => setInput("Explain the difference between Client and Server Components in Next.js.")} 
                className="px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 text-left transition-all shadow-sm hover:shadow-md"
              >
                "I'm a Full Stack Developer, My level is intermediate Can you interview me?"
              </button>
              <button 
                onClick={() => setInput("How does React's Virtual DOM actually work under the hood?")} 
                className="px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 text-left transition-all shadow-sm hover:shadow-md"
              >
                "I'm a Ai Engineer, My level is advanced Can you interview me?"
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
            {message.parts.map((part, index) => {
              // 1. عرض النصوص العادية
              if (part.type === 'text') {
                return (
                  <div key={`${message.id}-${index}`} className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/20'
                        : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                    }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{part.text}</p>
                  </div>
                );
              }

              // 2. عرض الأدوات
              if (part.type === 'tool-evaluate_answer') {
                switch (part.state) {
                  case 'input-streaming':
                  case 'input-available':
                    return (
                      <div key={part.toolCallId} className="max-w-[85%] bg-blue-50/50 border border-blue-100 p-4 rounded-2xl rounded-bl-none mt-1 animate-pulse flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        <span className="text-sm text-blue-700 font-medium">Analyzing your answer & generating score...</span>
                      </div>
                    );

                  case 'output-error':
                    return (
                      <div key={part.toolCallId} className="max-w-[85%] bg-red-50 border border-red-100 p-4 rounded-2xl rounded-bl-none mt-1 flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="text-sm text-red-800">
                          <strong className="font-semibold block mb-1">Evaluation Failed</strong>
                          <p className="opacity-90">{part.errorText || 'We encountered an issue while processing your score.'}</p>
                        </div>
                      </div>
                    );

                  case 'output-available': {
                    const output = part.output;
                    if (!output || typeof output !== 'object' || !('score' in output) || !('feedback' in output) || !('strengths' in output)) {
                      return null;
                    }

                    const { score, feedback, strengths } = output as { score: number; feedback: string; strengths: string[]; };
                    const isGoodScore = score >= 70;

                    return (
                      <div key={part.toolCallId} className="w-full max-w-[85%] bg-white border border-gray-200 p-5 rounded-2xl rounded-bl-none shadow-sm mt-1 transition-all duration-300">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <h3 className="font-bold text-gray-800">Evaluation Result</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-wide ${
                            isGoodScore ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                          }`}>
                            {score} / 100
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-5 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                          {feedback}
                        </p>
                        {strengths && strengths.length > 0 && (
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 block">Key Strengths</span>
                            <ul className="flex flex-wrap gap-2">
                              {strengths.map((str: string, i: number) => (
                                <li key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200">
                                  {str}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  }
                  default: return null;
                }
              }
              return null;
            })}
          </div>
        ))}

        {/* 2. Error State UI (Mid-stream API or Network Failure) */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <strong className="text-red-900 font-semibold block text-sm">Connection Interrupted</strong>
                <span className="text-red-700 text-xs">We couldn't reach the AI model. Check your network.</span>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-700 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95 w-full sm:w-auto"
            >
              <RefreshCcw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        )}

        {/* Thinking Indicator before text stream */}
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl rounded-bl-none px-5 py-3 flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit} className="flex gap-3 relative">
          <div className="flex-1 relative">
            <input
              className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400"
              value={input}
              onChange={(event) => {
                const value = event.target.value;
                if (value.length <= MAX_INPUT_LENGTH) setInput(value);
              }}
              placeholder="Type your response..."
              disabled={isLoading}
              maxLength={MAX_INPUT_LENGTH}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 pointer-events-none">
              {input.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="px-6 bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 rounded-2xl flex items-center justify-center transition-all"
              aria-label="Stop generating"
            >
              <StopCircle className="w-6 h-6" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 disabled:opacity-50 disabled:hover:shadow-none disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-all"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}