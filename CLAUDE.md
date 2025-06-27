# Lightfast Lab - Claude Code Desktop App

## Project Overview

Lightfast Lab is a Tauri desktop application that runs Claude Code instances with a chat UI interface for AI-powered coding assistance.

## Main Goal

Create and manage Claude Code instances through a desktop chat interface where:
- Users can create multiple Claude Code instances
- Send messages through a chat UI
- Claude Code streams responses back to the UI in real-time

## Tech Stack
- **Desktop**: Tauri v2
- **Frontend**: Vite, React 19, TypeScript 5.8, TanStack Router
- **Styling**: Tailwind CSS v4, shadcn/ui
- **AI Provider**: Anthropic Claude API
- **Build System**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Run in development
pnpm dev

# Build desktop app
pnpm build

# Code quality (Biome)
pnpm lint             # Run linting
pnpm format           # Format code
pnpm typecheck        # TypeScript type checking
```

## Claude Code Best Practices

### 1. Workflow: Explore → Plan → Code → Commit

When implementing features, follow this pattern:

```bash
# 1. Explore - Read relevant files first
# Ask Claude to read files and understand the codebase
# Example: "Read the chat interface components to understand the current implementation"

# 2. Plan - Think before coding
# Ask Claude to make a plan, use "think" to trigger extended thinking
# Example: "Think about how to implement real-time streaming for chat messages"

# 3. Code - Implement the solution
# Let Claude implement based on the plan

# 4. Commit - Save progress
# Ask Claude to commit with descriptive messages
```

### 2. Be Specific in Instructions

❌ **Poor**: "add chat functionality"
✅ **Good**: "implement a chat interface with real-time message streaming using SSE, showing typing indicators, and supporting markdown with syntax highlighting"

### 3. Use Images and URLs

- Paste screenshots for UI work
- Provide design mockups for visual reference
- Share documentation URLs for API integration

### 4. Course Correct Early

- Press `Escape` to interrupt Claude
- Double-tap `Escape` to edit previous prompts
- Use `/clear` between unrelated tasks to keep context focused

### 5. Test-Driven Development

For complex features:
1. Ask Claude to write tests first
2. Run tests to confirm they fail
3. Have Claude implement until tests pass
4. Iterate based on test results

## Project Structure

```
src/
├── main.ts          # Tauri main process
├── app.tsx          # React app entry
├── routes/          # TanStack Router pages
├── components/      # React components
│   ├── chat/        # Chat-related components
│   └── ui/          # shadcn/ui components
├── lib/             # Utilities and helpers
│   ├── claude-instance.ts
│   └── utils.ts
└── styles/          # Global styles
```

## Common Tasks

### Adding a New Feature
```bash
# 1. Read existing code
"Read the chat components to understand current patterns"

# 2. Plan the feature
"Think about adding message editing functionality"

# 3. Implement
"Implement message editing following existing patterns"

# 4. Test and iterate
"Take a screenshot and compare with the design"
```

### Debugging Issues
```bash
# 1. Understand the problem
"Read the error logs and relevant files"

# 2. Use subagents for investigation
"Use agents to search for similar error patterns"

# 3. Fix and verify
"Fix the issue and verify it works"
```

### Working with Tauri
```bash
# Frontend → Backend communication
"Implement a Tauri command for saving chat history"

# Window management
"Add a new window for Claude Code settings"

# System tray integration
"Add system tray icon with context menu"
```

## Environment Setup

Create `.env.local`:
```env
# Required
VITE_ANTHROPIC_API_KEY=your_api_key_here

# Optional
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=false
```

## Code Conventions

- **Components**: React functional components with TypeScript
- **State**: Use React hooks and context for state management
- **Styling**: Tailwind CSS with cn() utility for conditional classes
- **File naming**: kebab-case (enforced by Biome)
- **Imports**: Use ES modules, destructure when possible

## Development Tips

### Performance
- Use React.memo for expensive components
- Implement virtual scrolling for long chat histories
- Debounce user input for real-time features

### Claude Integration
- Stream responses using SSE or WebSockets
- Show typing indicators during generation
- Handle rate limits gracefully
- Cache responses when appropriate

### UI/UX
- Support keyboard shortcuts (Cmd+K for quick actions)
- Add smooth transitions and animations
- Implement dark/light theme support
- Show loading states for all async operations

## Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules .vite
pnpm install
pnpm build
```

### Tauri Issues
```bash
# Check Tauri CLI version
pnpm tauri --version

# Clean and rebuild
pnpm tauri clean
pnpm tauri build
```

### Type Errors
```bash
# Full type check
pnpm typecheck

# Watch mode for development
pnpm typecheck:watch
```

## Next Steps

1. Set up basic Tauri window and IPC
2. Implement Claude API client with streaming
3. Build chat UI with message components
4. Add instance management (tabs/sidebar)
5. Implement persistence and settings
6. Add keyboard shortcuts and productivity features
7. Package for distribution

Remember: Be specific, iterate often, and use `/clear` between unrelated tasks!
