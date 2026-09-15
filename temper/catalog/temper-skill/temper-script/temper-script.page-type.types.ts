import type { TemperScribingThing } from "akasha/temper/catalog/temper-skill/temper-scribing-thing/temper-scribing-thing.page-type.types.ts"
import type { SlotType } from "akasha/temper/catalog/temper-skill/temper-script/properties/slot-type.text-property.types.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}
