import type { Items } from "akasha/temper/characters/temper-mines/properties/items.page-property-entry.types.ts"
import type { Quests } from "akasha/temper/characters/temper-mines/properties/quests.page-property-entry.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"

export type TemperMine = TemperCharacterThing & {
  items?: Items
  quests?: Quests
}
