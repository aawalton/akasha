import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ValidSlots } from "../properties/valid-slots.text-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.types.ts"

export type TemperJewelryType = TemperGearThing & {
  key: Key
  validSlots: ValidSlots
}
