import type { Items } from "akasha/temper/character/temper-mine/properties/items.page-property-entry.types.ts"
import type { Quests } from "akasha/temper/character/temper-mine/properties/quests.page-property-entry.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"

export type TemperMine = TemperCharacterThing & {
  items?: Items
  quests?: Quests
}
