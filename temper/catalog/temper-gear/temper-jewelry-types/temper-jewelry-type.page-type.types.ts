import type { ValidSlots } from "akasha/temper/catalog/temper-gear/properties/valid-slots.text-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperJewelryType = TemperGearThing & {
  key: Key
  validSlots: ValidSlots
}
