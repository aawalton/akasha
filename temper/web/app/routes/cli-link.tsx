import { LayoutLink } from "@shared/design-layout/router-context"
import { Button } from "@shared/design-primitives/components/button"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { getUser } from "@shared/supabase-rr/auth/server"
import { data, useSearchParams } from "react-router"
import { CliLinkContent } from "@/components/cli-link/cli-link-content"
import type { Route } from "./+types/cli-link"

export function meta() {
  return [{ title: "Temper | Link CLI" }]
}

const MIN_PORT = 1024
const MAX_PORT = 65535

function parsePort(raw: string | null): number | null {
  if (raw == null) return null
  const n = Number(raw)
  if (!Number.isInteger(n)) return null
  if (n < MIN_PORT || n > MAX_PORT) return null
  return n
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  return data({ userEmail: user?.email ?? null }, { headers })
}

export default function CliLinkPage({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const port = parsePort(searchParams.get("port"))
  const state = searchParams.get("state") ?? ""
  const stateValid = state.length > 0

  if (loaderData.userEmail === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className={cn("max-w-md space-y-4 rounded-lg p-6 text-center", surfaceClass(1))}>
          <p className="text-secondary text-sm">
            The account you are signed in to has no email address on it, and linking the CLI needs
            one to mint a session. The link you opened is fine — sign in with an email-based account
            to continue.
          </p>
        </div>
      </div>
    )
  }

  if (port === null || !stateValid) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className={cn("max-w-md space-y-4 rounded-lg p-6 text-center", surfaceClass(1))}>
          <p className="text-secondary text-sm">
            Missing or invalid parameters. <code>port</code> must be an integer between {MIN_PORT}{" "}
            and {MAX_PORT}, and <code>state</code> must be a non-empty string. This page is opened
            by the Temper Watcher when it links to your account, not visited directly.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-tertiary">Don't have the Temper Watcher yet?</p>
            <Button asChild variant="accent" size="sm">
              <LayoutLink href="/watcher">Download the Temper Watcher</LayoutLink>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <CliLinkContent port={port} state={state} userEmail={loaderData.userEmail} />
}
