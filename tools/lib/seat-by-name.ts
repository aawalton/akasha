import { type SeatPresence, statedProcessPresence } from "@akasha/seat-system/seat-proc-key"
import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
} from "../../akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"

export interface SeatByName {
  readonly id: string
  readonly name: string
  readonly presence: SeatPresence
}

// A SEAT IS FOUND BY NAME IN AKASHA AND NOWHERE ELSE. This opened every file in the old seat
// directory and compared the `title` its frontmatter carried, which was only ever the seat's slug
// spelled a second time. In akasha that slug is the name the page file stands under, so the index
// answers it without opening a page at all.
export function seatByName(name: string): SeatByName | null {
  const id = akashaSeatIdForName(name)
  if (id === null) return null
  return { id, name, presence: statedProcessPresence(akashaHolderProcessOf(id)) }
}
