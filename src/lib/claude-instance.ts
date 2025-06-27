import Anthropic from '@anthropic-ai/sdk';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class ClaudeInstance {
  id: string;
  name: string;
  messages: Message[];
  isStreaming: boolean;
  private anthropic: Anthropic | null;

  constructor() {
    this.id = `claude-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.name = `Claude Instance ${new Date().toLocaleTimeString()}`;
    this.messages = [];
    this.isStreaming = false;
    this.anthropic = null;
  }

  async initialize(apiKey: string) {
    this.anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // For desktop app
    });
  }

  async sendMessage(content: string, onChunk: (chunk: string) => void): Promise<void> {
    if (!this.anthropic) {
      throw new Error('Claude instance not initialized');
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    this.messages.push(userMessage);

    const assistantMessage: Message = {
      id: `msg-${Date.now()}-assistant`,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    this.messages.push(assistantMessage);

    this.isStreaming = true;

    try {
      const stream = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: this.messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        stream: true,
      });

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          assistantMessage.content += chunk.delta.text;
          onChunk(chunk.delta.text);
        }
      }
    } catch (error) {
      console.error('Error streaming from Claude:', error);
      assistantMessage.content = 'Error: Failed to get response from Claude';
    } finally {
      this.isStreaming = false;
    }
  }
}