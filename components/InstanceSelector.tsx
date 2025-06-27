import { ClaudeInstance } from '@/lib/claude-instance';
import { Plus } from 'lucide-react';

interface InstanceSelectorProps {
  instances: ClaudeInstance[];
  activeInstanceId: string | null;
  onSelectInstance: (id: string) => void;
  onCreateInstance: () => void;
}

export default function InstanceSelector({
  instances,
  activeInstanceId,
  onSelectInstance,
  onCreateInstance
}: InstanceSelectorProps) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Claude Instances</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {instances.map((instance) => (
          <button
            key={instance.id}
            onClick={() => onSelectInstance(instance.id)}
            className={`w-full p-3 text-left hover:bg-gray-700 transition-colors ${
              activeInstanceId === instance.id ? 'bg-gray-700' : ''
            }`}
          >
            <div className="text-sm text-white">{instance.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              {instance.messages.length} messages
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onCreateInstance}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Instance
        </button>
      </div>
    </div>
  );
}