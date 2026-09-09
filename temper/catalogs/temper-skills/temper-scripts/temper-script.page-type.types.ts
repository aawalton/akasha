import type { SlotType } from "../properties/slot-type.text-property.ts"
import type { TemperScribingThing } from "../temper-scribing-things/temper-scribing-thing.page-type.types.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}
