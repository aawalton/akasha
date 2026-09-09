import type { PageType } from "@akasha/pages/page-type"
import type { Abbreviation } from "../temper-companion-things/properties/abbreviation.text-property.ts"
import type { ValidArmorWeights } from "../temper-companion-things/properties/valid-armor-weights.text-property.ts"
import type { ValidTraitIds } from "../temper-companion-things/properties/valid-trait-ids.text-property.ts"
import type { ValidWeaponRoleIds } from "../temper-companion-things/properties/valid-weapon-role-ids.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionBaseRole = TemperCompanionThing & {
  abbreviation: Abbreviation
  validArmorWeights: readonly ValidArmorWeights[]
  validTraitIds: readonly ValidTraitIds[]
  validWeaponRoleIds: readonly ValidWeaponRoleIds[]
}

export const temperCompanionBaseRole = {
  id: "01a05fce-1851-7d9f-9f36-f8f9bf8792ea",
  pageTypeSlug: "page-type",
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
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/abbreviation", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    {
      pagePropertySlug: "text-property/valid-armor-weights",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pagePropertySlug: "text-property/valid-trait-ids",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pagePropertySlug: "text-property/valid-weapon-role-ids",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
