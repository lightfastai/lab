import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  const handleSave = () => {
    // Save settings to localStorage or app state
    localStorage.setItem('anthropic-api-key', apiKey)
    localStorage.setItem('dark-mode', darkMode.toString())
    alert('Settings saved!')
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Anthropic API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Dark Mode</span>
          </label>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/settings')({ 
  component: SettingsPage,
})