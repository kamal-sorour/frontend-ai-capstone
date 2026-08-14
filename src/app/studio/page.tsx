// src/app/studio/page.tsx
'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { StopCircle, Send, Loader2 } from 'lucide-react';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll logic reference
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll that respects user scrolling up
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Check if the user is already near the bottom before auto-scrolling
    const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            Start the qualification chat to begin...
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-900 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        
        {/* Thinking Indicator */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 rounded-2xl rounded-bl-none px-5 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-3 relative">
          <input
            className="flex-1 px-5 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          
          {/* Dynamic Button: Stop or Send */}
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="px-6 bg-red-100 text-red-600 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Stop generating"
            >
              <StopCircle className="w-6 h-6" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}