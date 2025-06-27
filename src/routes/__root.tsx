import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// CSS is imported in main.tsx

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen bg-gray-900">
        <nav className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-lg font-semibold text-white">Claude Code</h1>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                activeProps={{
                  className: 'bg-gray-700 text-white'
                }}
              >
                Chat
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                activeProps={{
                  className: 'bg-gray-700 text-white'
                }}
              >
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})