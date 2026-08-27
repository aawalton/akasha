import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"
import { seatAbove } from "./subagent.ts"

export function pageValuesOf(agent: string): Record<string, unknown> | null {
  const own = seatPageForAgent(agent)
  if (own !== null) return frontmatterOf(own)
  const seat = seatAbove(agent)
  if (seat === null) return null
  const above = seatPageForAgent(seat)
  return above === null ? null : frontmatterOf(above)
}

export function pageTextOf(agent: string, key: string): string | null {
  const held = pageValuesOf(agent)?.[key]
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number") return String(held)
  return null
}

export function pageFlagOf(agent: string, key: string): boolean {
  return pageValuesOf(agent)?.[key] === true
}
