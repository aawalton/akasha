import { resolveRoots } from "../../repo/roots/roots"
import { frontmatterFromHistory, nameFromHistory } from "./seat-page-history.ts"
import { akashaHolderProcessOf } from "./seat-akasha-beside.ts"
import { pageValuesOf } from "./seat-page-values.ts"
import { seatPageForAgent, seatPresence } from "./seat-presence-read.ts"
import { type SeatPresence, statedProcessPresence } from "./seat-proc-key.ts"
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
  // The old page, then akasha, then the history — the same order everywhere else reads in. A
  // relaunch stands a seat back up from what this answers, so a seat read as stating nothing is
  // relaunched without the account it signs in as.
  const page = seatPageForAgent(agentId)
  const seat = pageValuesOf(agentId)
  if (seat === null) {
    const remembered = fromHistory(agentId)
    if (remembered !== null) return { target: remembered }
    return { error: `No agent found matching '${agentId}'` }
  }
  return {
    target: {
      name: textAt(seat, TITLE),
      account: textAt(seat, ACCOUNT_KEY),
      // Presence is read off the page while one stands, and off what akasha holds once none does.
      presence:
        page === null
          ? statedProcessPresence(akashaHolderProcessOf(agentId))
          : seatPresence(page),
      sessionId: sessionOf(agentId)?.value ?? null,
    },
  }
}
