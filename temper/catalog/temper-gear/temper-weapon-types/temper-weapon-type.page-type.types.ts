import type { EnchantmentMultiplier } from "akasha/temper/catalog/temper-gear/properties/enchantment-multiplier.number-property.types.ts"
import type { EsoWeaponType } from "akasha/temper/catalog/temper-gear/properties/eso-weapon-type.text-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/temper-gear/properties/valid-slots.text-property.types.ts"
import type { WeaponTypePower } from "akasha/temper/catalog/temper-gear/properties/weapon-type-power.number-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { IsTwoHanded } from "akasha/temper/catalog/things/properties/is-two-handed.boolean-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperWeaponType = TemperGearThing & {
  key: Key
  enchantmentMultiplier: EnchantmentMultiplier
  esoWeaponType: EsoWeaponType
  isTwoHanded: IsTwoHanded
  weaponPower: WeaponTypePower
  validSlots: ValidSlots
}
