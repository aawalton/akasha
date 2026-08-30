import { akashaSeatValuesOf } from "./seat-akasha-read.ts"
import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"
import { seatAbove } from "./subagent.ts"

// A seat is read where it stands, and it stands in both systems while the writers write to both.
// The old page answers first because it is what the fleet writes; akasha answers for a seat whose
// old page has gone, which is every seat the sweep took. Without that second read a seat that had
// only stopped read as a seat that had never stated anything, and nothing it declared — its
// persona, its domain, its role — could be composed back onto a page.
function statedOnAPage(agent: string): Record<string, unknown> | null {
  const own = seatPageForAgent(agent)
  const held = own === null ? null : frontmatterOf(own)
  return held ?? akashaSeatValuesOf(agent)
}

export function pageValuesOf(agent: string): Record<string, unknown> | null {
  const own = statedOnAPage(agent)
  if (own !== null) return own
  const seat = seatAbove(agent)
  return seat === null ? null : statedOnAPage(seat)
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
