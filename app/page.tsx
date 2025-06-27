"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import InstanceSelector from "@/components/InstanceSelector";
import { ClaudeInstance } from "@/lib/claude-instance";

export default function Home() {
  const [instances, setInstances] = useState<ClaudeInstance[]>([]);
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null);

  const activeInstance = instances.find(inst => inst.id === activeInstanceId);

  const createNewInstance = () => {
    const newInstance = new ClaudeInstance();
    setInstances([...instances, newInstance]);
    setActiveInstanceId(newInstance.id);
  };

  return (
    <div className="flex h-screen bg-gray-900">
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
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-4">No Claude Code instance selected</p>
              <button
                onClick={createNewInstance}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Create New Instance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}