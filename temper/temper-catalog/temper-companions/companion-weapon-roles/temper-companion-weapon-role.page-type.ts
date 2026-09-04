import type { PageType } from "@akasha/pages-system/page-type"
import type { ValidMainHandWeaponTypes } from "../temper-companion-things/properties/valid-main-hand-weapon-types.text-property.ts"
import type { ValidOffHandWeaponTypes } from "../temper-companion-things/properties/valid-off-hand-weapon-types.text-property.ts"
import type { WeaponSkillLineId } from "../temper-companion-things/properties/weapon-skill-line-id.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionWeaponRole = TemperCompanionThing & {
  weaponSkillLineId: WeaponSkillLineId
  validMainHandWeaponTypes?: readonly ValidMainHandWeaponTypes[]
  validOffHandWeaponTypes?: readonly ValidOffHandWeaponTypes[]
}

export const temperCompanionWeaponRole = {
  id: "01a05fcd-aed1-7e12-be73-72bd7b05ba15",
  pageTypeSlug: "page-type",
  slug: "temper-companion-weapon-role",
  definition: "a way a companion's weapons are paired",
  pluralSlug: "temper-companion-weapon-roles",
  extendsSlug: ["page-type/temper-companion-thing"],
  partSlugs: [
    "text-property/valid-main-hand-weapon-types",
    "text-property/valid-off-hand-weapon-types",
    "text-property/weapon-skill-line-id",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "weapon-skill-line-id", required: true, many: false },
    { pagePropertySlug: "valid-main-hand-weapon-types", required: false, many: true, max: null },
    { pagePropertySlug: "valid-off-hand-weapon-types", required: false, many: true, max: null },
  ],
} as const satisfies PageType
