import { existsSync } from "node:fs"
import { seatPageForAgent } from "./seat-presence-read.ts"
import { subagentPagePathFor } from "./subagent-page-read.ts"

export function agentPagePathFor(agent: string): string | null {
  if (agent === "") return null
  const own = subagentPagePathFor(agent)
  if (own !== null) return existsSync(own) ? own : null
  return seatPageForAgent(agent)
}
