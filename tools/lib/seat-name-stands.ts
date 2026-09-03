import {
  composeSeatName,
  movesWithTheAttributes,
  type NameableSeat,
} from "../../akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"
import { composedNameOf, SEAT_ID } from "./seat-rename.ts"

export function nameStanding(agent: string, root: string, next: NameableSeat): string | null {
  if (!SEAT_ID.test(agent)) return null
  const held = composedNameOf(agent)
  if (held !== null && !movesWithTheAttributes(held, root)) return held
  return composeSeatName(next, root) ?? held
}
