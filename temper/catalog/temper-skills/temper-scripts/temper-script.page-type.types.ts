import type { SlotType } from "akasha/temper/catalog/temper-skills/properties/slot-type.text-property.types.ts"
import type { TemperScribingThing } from "akasha/temper/catalog/temper-skills/temper-scribing-things/temper-scribing-thing.page-type.types.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}
