import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ClaudeInstance } from "@/lib/claude-instance"
import { cn } from "@/lib/utils"

interface InstanceSelectorProps {
  instances: ClaudeInstance[]
  activeInstanceId: string | null
  onSelectInstance: (id: string) => void
  onCreateInstance: () => void
}

export default function InstanceSelector({
  instances,
  activeInstanceId,
  onSelectInstance,
  onCreateInstance,
}: InstanceSelectorProps) {
  return (
    <div className="w-64 bg-muted/50 border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Claude Instances</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {instances.map((instance) => (
            <button
              type="button"
              key={instance.id}
              onClick={() => onSelectInstance(instance.id)}
              className={cn(
                "w-full p-3 text-left rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                activeInstanceId === instance.id && "bg-accent text-accent-foreground",
              )}
            >
              <div className="text-sm font-medium">{instance.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{instance.messages.length} messages</div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button onClick={onCreateInstance} className="w-full" variant="default">
          <Plus className="h-4 w-4 mr-2" />
          New Instance
        </Button>
      </div>
    </div>
  )
}
