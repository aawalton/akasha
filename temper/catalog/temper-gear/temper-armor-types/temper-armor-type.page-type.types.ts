import type { ArmorMultiplier } from "akasha/temper/catalog/temper-gear/properties/armor-multiplier.number-property.types.ts"
import type { IsLargeEnchantSlot } from "akasha/temper/catalog/temper-gear/properties/is-large-enchant-slot.boolean-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/temper-gear/properties/valid-slots.text-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperArmorType = TemperGearThing & {
  key: Key
  armorMultiplier: ArmorMultiplier
  isLargeEnchantSlot: IsLargeEnchantSlot
  validSlots: ValidSlots
}
