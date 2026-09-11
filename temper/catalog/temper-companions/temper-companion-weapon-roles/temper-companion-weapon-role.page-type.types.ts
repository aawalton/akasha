import type { ValidMainHandWeaponTypes } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-main-hand-weapon-types.text-property.types.ts"
import type { ValidOffHandWeaponTypes } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-off-hand-weapon-types.text-property.types.ts"
import type { WeaponSkillLineId } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/weapon-skill-line-id.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionWeaponRole = TemperCompanionThing & {
  key: Key
  weaponSkillLineId: WeaponSkillLineId
  validMainHandWeaponTypes?: ValidMainHandWeaponTypes
  validOffHandWeaponTypes?: ValidOffHandWeaponTypes
}
