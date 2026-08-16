'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { StopCircle, Send, Loader2 } from 'lucide-react';

const MAX_INPUT_LENGTH = 2000;

export default function ChatInterface() {
  const [input, setInput] = useState('');

  const {
    messages,
    sendMessage,
    status,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isLoading =
    status === 'submitted' || status === 'streaming';

  // Auto-scroll
  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    // Prevent empty messages
    if (!trimmedInput) return;

    // Frontend length protection
    if (trimmedInput.length > MAX_INPUT_LENGTH) {
      return;
    }

    // Prevent sending while another response is streaming
    if (isLoading) return;

    sendMessage({
      text: trimmedInput,
    });

    setInput('');
  };

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

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              {/* AI SDK 7 uses message.parts */}
              {message.parts.map((part, index) => {
                if (part.type !== 'text') {
                  return null;
                }

                return (
                  <p
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap leading-relaxed"
                  >
                    {part.text}
                  </p>
                );
              })}
            </div>
          </div>
        ))}

        {/* Thinking Indicator */}
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 rounded-2xl rounded-bl-none px-5 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />

              <span className="text-sm">
                Thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 relative"
        >
          <div className="flex-1 relative">
            <input
              className="w-full px-5 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={input}
              onChange={(event) => {
                const value = event.target.value;

                // Hard client-side limit
                if (value.length <= MAX_INPUT_LENGTH) {
                  setInput(value);
                }
              }}
              placeholder="Type your message..."
              disabled={isLoading}
              maxLength={MAX_INPUT_LENGTH}
            />

            {/* Character Counter */}
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              {input.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>

          {/* Dynamic Button */}
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