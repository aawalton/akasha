import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { Items } from "./properties/items.page-property-entry.ts"
import type { Quests } from "./properties/quests.page-property-entry.ts"

export type TemperMine = TemperCharacterThing & {
  items?: Items
  quests?: Quests
}
