import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { Items } from "./properties/items.page-property-entry.types.ts"
import type { Quests } from "./properties/quests.page-property-entry.types.ts"

export type TemperMine = TemperCharacterThing & {
  items?: Items
  quests?: Quests
}
