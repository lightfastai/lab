"use client";

import { useState, useEffect, useRef } from 'react';
import { ClaudeInstance } from '@/lib/claude-instance';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatInterfaceProps {
  instance: ClaudeInstance;
}

export default function ChatInterface({ instance }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(instance.messages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [needsApiKey, setNeedsApiKey] = useState(true);

  useEffect(() => {
    setMessages(instance.messages);
  }, [instance]);

  const handleSendMessage = async (content: string) => {
    if (!apiKey) {
      alert('Please enter your Anthropic API key');
      return;
    }

    if (!instance.anthropic) {
      await instance.initialize(apiKey);
    }

    setIsStreaming(true);
    
    try {
      await instance.sendMessage(content, (chunk) => {
        // Force re-render to show streaming content
        setMessages([...instance.messages]);
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsStreaming(false);
      setMessages([...instance.messages]);
    }
  };

  if (needsApiKey && !apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <div className="max-w-md w-full p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Enter Anthropic API Key</h3>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={() => setNeedsApiKey(false)}
            disabled={!apiKey}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="border-b border-gray-700 p-4">
        <h1 className="text-xl font-semibold text-white">{instance.name}</h1>
      </div>
      
      <MessageList messages={messages} />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={isStreaming}
        isStreaming={isStreaming}
      />
    </div>
  );
}