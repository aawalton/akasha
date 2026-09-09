import type { PageType } from "@akasha/pages/page-type"
import type { EnchantmentMultiplier } from "../properties/enchantment-multiplier.number-property.ts"
import type { EsoWeaponType } from "../properties/eso-weapon-type.text-property.ts"
import type { WeaponTypePower } from "../properties/weapon-type-power.number-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.types.ts"

export type TemperWeaponType = TemperGearThing & {
  enchantmentMultiplier: EnchantmentMultiplier
  esoWeaponType: EsoWeaponType
  weaponPower: WeaponTypePower
}

export const temperWeaponType = {
  id: "01a05fd1-d442-7b45-8a20-d4ff90ea6255",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-weapon-type",
  definition: "a kind of weapon",
  pluralSlug: "temper-weapon-types",
  extends: ["page-type/temper-gear-thing"],
  parts: [
    "number-property/enchantment-multiplier",
    "number-property/weapon-type-power",
    "text-property/eso-weapon-type",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/enchantment-multiplier", required: true, many: false },
    { pageProperty: "text-property/eso-weapon-type", required: true, many: false },
    { pageProperty: "boolean-property/is-two-handed", required: true, many: false },
    { pageProperty: "number-property/weapon-type-power", required: true, many: false },
    { pageProperty: "text-property/valid-slots", required: true, many: true, maxCount: null },
  ],
} as const satisfies PageType
