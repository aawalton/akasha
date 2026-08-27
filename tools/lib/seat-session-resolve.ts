import { resolveRoots } from "../../repo/roots/roots"
import { sessionFromHistory } from "./seat-page-history.ts"
import { sessionOf } from "./seat-session.ts"

export type SessionLookup = { readonly session: string } | { readonly error: string }

export async function resolveSessionIdByAgentId(agentId: string): Promise<SessionLookup> {
  const stated = sessionOf(agentId)
  if (stated !== null) return { session: stated.value }
  const held = sessionFromHistory(agentId, resolveRoots())
  if (held !== null) return { session: held }
  return {
    error: `no session stands for agent ${agentId}, on its seat page or in the memory repo's history`,
  }
}
