import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ArmorMultiplier } from "../properties/armor-multiplier.number-property.types.ts"
import type { IsLargeEnchantSlot } from "../properties/is-large-enchant-slot.boolean-property.types.ts"
import type { ValidSlots } from "../properties/valid-slots.text-property.types.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.types.ts"

export type TemperArmorType = TemperGearThing & {
  key: Key
  armorMultiplier: ArmorMultiplier
  isLargeEnchantSlot: IsLargeEnchantSlot
  validSlots: ValidSlots
}
