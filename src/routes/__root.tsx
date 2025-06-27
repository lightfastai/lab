import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
// CSS is imported in main.tsx

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen">
        <nav className="w-64 bg-muted/50 border-r flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-lg font-semibold">Claude Code</h1>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
                }}
              >
                Chat
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
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
