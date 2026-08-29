import { sessionOf } from "./seat-session.ts"

export type SessionLookup = { readonly session: string } | { readonly error: string }

export async function resolveSessionIdByAgentId(agentId: string): Promise<SessionLookup> {
  const stated = sessionOf(agentId)
  if (stated !== null) return { session: stated.value }
  return {
    error: `no session stands for agent ${agentId}; a seat that has stopped keeps none`,
  }
}
