import type { PageType } from "@akasha/pages/page-type"
import type { IsOffHandOnly } from "../temper-companion-things/properties/is-off-hand-only.boolean-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionWeaponType = TemperCompanionThing & {
  isOffHandOnly: IsOffHandOnly
}

export const temperCompanionWeaponType = {
  id: "01a05fcd-aed1-71b0-8b8c-2b74e9a2d662",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-weapon-type",
  definition: "a kind of weapon a companion wields",
  pluralSlug: "temper-companion-weapon-types",
  extends: ["page-type/temper-companion-thing"],
  parts: ["boolean-property/is-off-hand-only"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/is-off-hand-only", required: true, many: false },
    { pageProperty: "boolean-property/is-two-handed", required: true, many: false },
  ],
} as const satisfies PageType
