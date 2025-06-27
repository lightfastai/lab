import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ChatInterface from "../components/chat-interface"
import InstanceSelector from "../components/instance-selector"
import { ClaudeInstance } from "../lib/claude-instance"

function HomePage() {
  const [instances, setInstances] = useState<ClaudeInstance[]>([])
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null)

  const activeInstance = instances.find((inst) => inst.id === activeInstanceId)

  const createNewInstance = () => {
    const newInstance = new ClaudeInstance()
    setInstances([...instances, newInstance])
    setActiveInstanceId(newInstance.id)
  }

  return (
    <div className="flex h-full">
      <InstanceSelector
        instances={instances}
        activeInstanceId={activeInstanceId}
        onSelectInstance={setActiveInstanceId}
        onCreateInstance={createNewInstance}
      />
      <div className="flex-1">
        {activeInstance ? (
          <ChatInterface instance={activeInstance} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-4">No Claude Code instance selected</p>
              <Button onClick={createNewInstance}>Create New Instance</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/")({
  component: HomePage,
})
