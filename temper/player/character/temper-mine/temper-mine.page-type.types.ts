import type { Items } from "akasha/temper/player/character/temper-mine/properties/items.page-property-entry.types.ts"
import type { PartSpans } from "akasha/temper/player/character/temper-mine/properties/part-spans.page-property-entry.types.ts"
import type { Quests } from "akasha/temper/player/character/temper-mine/properties/quests.page-property-entry.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"

export type TemperMine = TemperCharacterThing & {
  items?: Items
  quests?: Quests
  partSpans?: PartSpans
}
