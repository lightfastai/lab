import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { ClaudeInstance } from "@/lib/claude-instance"
import MessageInput from "./message-input"
import MessageList from "./message-list"

interface ChatInterfaceProps {
  instance: ClaudeInstance
}

export default function ChatInterface({ instance }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(instance.messages)
  const [isStreaming, setIsStreaming] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [needsApiKey, setNeedsApiKey] = useState(true)

  useEffect(() => {
    setMessages(instance.messages)
  }, [instance])

  const handleSendMessage = async (content: string) => {
    if (!apiKey) {
      alert("Please enter your Anthropic API key")
      return
    }

    if (!instance.anthropic) {
      await instance.initialize(apiKey)
    }

    setIsStreaming(true)

    try {
      await instance.sendMessage(content, (_chunk) => {
        // Force re-render to show streaming content
        setMessages([...instance.messages])
      })
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsStreaming(false)
      setMessages([...instance.messages])
    }
  }

  if (needsApiKey && !apiKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Enter Anthropic API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
            />
            <Button onClick={() => setNeedsApiKey(false)} disabled={!apiKey} className="w-full">
              Start Chatting
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">{instance.name}</h1>
      </div>

      <MessageList messages={messages} />

      <MessageInput onSendMessage={handleSendMessage} disabled={isStreaming} isStreaming={isStreaming} />
    </div>
  )
}
