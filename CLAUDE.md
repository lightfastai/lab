# Lightfast Lab - Claude Code Desktop App

## Project Overview

Lightfast Lab is a Tauri desktop application that runs Claude Code instances with a chat UI interface for AI-powered coding assistance.

## Main Goal

Create and manage Claude Code instances through a desktop chat interface where:
- Users can create multiple Claude Code instances
- Send messages through a chat UI
- Claude Code streams responses back to the UI in real-time

## Tech Stack
- **Desktop**: Tauri
- **Frontend**: Next.js 15.3, React 19.1, TypeScript 5.8
- **AI Provider**: Anthropic Claude API
- **Build System**: Turborepo with pnpm

## Development Commands

### Getting Started
```bash
# Install dependencies
pnpm install

# Run desktop app in development
pnpm dev:desktop

# Build desktop app
pnpm build:desktop

# Code quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues
pnpm format           # Check formatting
pnpm format:fix       # Fix formatting
pnpm typecheck        # TypeScript type checking
```

## Claude Code Integration

### Core Features
1. **Instance Management**: Create and manage multiple Claude Code instances
2. **Chat Interface**: Send messages and receive streaming responses
3. **Real-time Streaming**: Display Claude's responses as they stream in

### Implementation Requirements
- Stream Claude API responses to the UI
- Handle multiple concurrent Claude Code instances
- Maintain chat history per instance
- Display code blocks with syntax highlighting
- Show typing indicators during response generation

## Environment Variables

Create `.env.local` in the desktop app directory:

```env
# Claude API
ANTHROPIC_API_KEY=your_api_key_here
```

## Project Structure
```
apps/desktop/         # Tauri desktop application with chat UI
packages/ai/          # Claude API integration
packages/ui/          # Shared UI components for chat interface
```

## Development Notes

### Claude Code Instance
- Each instance maintains its own conversation context
- Supports streaming responses using Server-Sent Events (SSE)
- Handles code generation, explanations, and general programming assistance

### Chat UI Requirements
- Message input with multi-line support
- Message history display
- Code block rendering with syntax highlighting
- Copy code functionality
- Loading states during API calls
- Error handling for failed requests

## Next Steps

1. Set up Tauri desktop app structure
2. Implement Claude API integration with streaming
3. Build chat UI components
4. Connect UI to Claude Code instances
5. Add instance management features

## Code Style and Conventions

### File Naming
- **Components**: Use kebab-case for all component files (e.g., `chat-interface.tsx`, `message-list.tsx`)
- **Utilities**: Use kebab-case for utility files (e.g., `claude-instance.ts`)
- **Routes**: Use kebab-case for route files

This is enforced by Biome's `useFilenamingConvention` rule.
