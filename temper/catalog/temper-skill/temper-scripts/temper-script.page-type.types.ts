import type { SlotType } from "akasha/temper/catalog/temper-skill/properties/slot-type.text-property.types.ts"
import type { TemperScribingThing } from "akasha/temper/catalog/temper-skill/temper-scribing-things/temper-scribing-thing.page-type.types.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}
