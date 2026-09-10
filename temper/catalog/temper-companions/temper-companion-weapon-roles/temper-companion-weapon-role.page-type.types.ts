import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ValidMainHandWeaponTypes } from "../temper-companion-things/properties/valid-main-hand-weapon-types.text-property.ts"
import type { ValidOffHandWeaponTypes } from "../temper-companion-things/properties/valid-off-hand-weapon-types.text-property.ts"
import type { WeaponSkillLineId } from "../temper-companion-things/properties/weapon-skill-line-id.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionWeaponRole = TemperCompanionThing & {
  key: Key
  weaponSkillLineId: WeaponSkillLineId
  validMainHandWeaponTypes?: ValidMainHandWeaponTypes
  validOffHandWeaponTypes?: ValidOffHandWeaponTypes
}
