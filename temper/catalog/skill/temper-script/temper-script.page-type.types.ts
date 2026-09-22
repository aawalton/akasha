import type { TemperScribingThing } from "akasha/temper/catalog/skill/temper-scribing-thing/temper-scribing-thing.page-type.types.ts"
import type { SlotType } from "akasha/temper/catalog/skill/temper-script/properties/slot-type.select-property.types.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}
