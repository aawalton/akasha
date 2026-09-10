import type { PageType } from "@akasha/pages/page-type"
import type { Abbreviation } from "../temper-companion-things/properties/abbreviation.text-property.ts"
import type { ValidArmorWeights } from "../temper-companion-things/properties/valid-armor-weights.text-property.ts"
import type { ValidTraitIds } from "../temper-companion-things/properties/valid-trait-ids.text-property.ts"
import type { ValidWeaponRoleIds } from "../temper-companion-things/properties/valid-weapon-role-ids.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionBaseRole = TemperCompanionThing & {
  abbreviation: Abbreviation
  validArmorWeights: ValidArmorWeights
  validTraitIds: ValidTraitIds
  validWeaponRoleIds: ValidWeaponRoleIds
}

export const temperCompanionBaseRole = {
  id: "01a05fce-1851-7d9f-9f36-f8f9bf8792ea",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-base-role",
  definition: "a part a companion is built to play",
  pluralSlug: "temper-companion-base-roles",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "text-property/abbreviation",
    "text-property/valid-armor-weights",
    "text-property/valid-trait-ids",
    "text-property/valid-weapon-role-ids",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/abbreviation", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    {
      pageProperty: "text-property/valid-armor-weights",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-trait-ids",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-weapon-role-ids",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
