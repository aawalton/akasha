import { resolveRoots } from "../../repo/roots/roots"
import { frontmatterFromHistory, nameFromHistory } from "./seat-page-history.ts"
import { frontmatterOf, seatPageForAgent, seatPresence } from "./seat-presence-read.ts"
import type { SeatPresence } from "./seat-proc-key.ts"
import { sessionOf } from "./seat-session.ts"

const TITLE = "title"

const ACCOUNT_KEY = "registration-account"

export interface RelaunchTarget {
  readonly name: string | null
  readonly account: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

function textAt(frontmatter: Record<string, unknown> | null, key: string): string | null {
  const held = frontmatter?.[key]
  return typeof held === "string" && held !== "" ? held : null
}

function fromHistory(agentId: string): RelaunchTarget | null {
  const roots = resolveRoots()
  const name = nameFromHistory(agentId, roots)
  if (name === null) return null
  return {
    name,
    account: textAt(frontmatterFromHistory(agentId, roots), ACCOUNT_KEY),
    presence: "absent",
    sessionId: null,
  }
}

export async function resolveRelaunchTarget(
  agentId: string
): Promise<{ readonly target: RelaunchTarget } | { readonly error: string }> {
  const page = seatPageForAgent(agentId)
  if (page === null) {
    const remembered = fromHistory(agentId)
    if (remembered !== null) return { target: remembered }
    return { error: `No agent found matching '${agentId}'` }
  }
  const seat = frontmatterOf(page)
  return {
    target: {
      name: textAt(seat, TITLE),
      account: textAt(seat, ACCOUNT_KEY),
      presence: seatPresence(page),
      sessionId: sessionOf(agentId)?.value ?? null,
    },
  }
}
