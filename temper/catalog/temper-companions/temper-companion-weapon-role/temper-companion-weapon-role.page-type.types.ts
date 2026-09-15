import type { ValidMainHandWeaponTypes } from "akasha/temper/catalog/temper-companions/temper-companion-thing/properties/valid-main-hand-weapon-types.text-property.types.ts"
import type { ValidOffHandWeaponTypes } from "akasha/temper/catalog/temper-companions/temper-companion-thing/properties/valid-off-hand-weapon-types.text-property.types.ts"
import type { WeaponSkillLineId } from "akasha/temper/catalog/temper-companions/temper-companion-thing/properties/weapon-skill-line-id.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-thing/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionWeaponRole = TemperCompanionThing & {
  key: Key
  weaponSkillLineId: WeaponSkillLineId
  validMainHandWeaponTypes?: ValidMainHandWeaponTypes
  validOffHandWeaponTypes?: ValidOffHandWeaponTypes
}
