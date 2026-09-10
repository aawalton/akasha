import type { Key } from "../../../things/properties/key.text-property.ts"
import type { IsTwoHanded } from "../../things/properties/is-two-handed.boolean-property.ts"
import type { EnchantmentMultiplier } from "../properties/enchantment-multiplier.number-property.ts"
import type { EsoWeaponType } from "../properties/eso-weapon-type.text-property.ts"
import type { ValidSlots } from "../properties/valid-slots.text-property.ts"
import type { WeaponTypePower } from "../properties/weapon-type-power.number-property.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.types.ts"

export type TemperWeaponType = TemperGearThing & {
  key: Key
  enchantmentMultiplier: EnchantmentMultiplier
  esoWeaponType: EsoWeaponType
  isTwoHanded: IsTwoHanded
  weaponPower: WeaponTypePower
  validSlots: ValidSlots
}
