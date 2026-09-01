import { type NameableSeat, composeSeatName, movesWithTheAttributes } from "./compose-seat-name.ts"
import { SEAT_ID, composedNameOf } from "./seat-rename.ts"

export function nameStanding(agent: string, root: string, next: NameableSeat): string | null {
  if (!SEAT_ID.test(agent)) return null
  const held = composedNameOf(agent)
  if (held !== null && !movesWithTheAttributes(held, root)) return held
  return composeSeatName(next, root) ?? held
}
