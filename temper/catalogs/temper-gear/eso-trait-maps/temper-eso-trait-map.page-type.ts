import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoTraitNum } from "../properties/eso-trait-num.number-property.ts"
import type { TraitFamily } from "../properties/trait-family.text-property.ts"
import type { TraitId } from "../properties/trait-id.text-property.ts"

export type TemperEsoTraitMap = TemperCatalogThing & {
  traitFamily: TraitFamily
  traitId: TraitId
  esoTraitNum: EsoTraitNum
}

export const temperEsoTraitMap = {
  id: "01a05fd1-d431-71e8-91f5-9767d9744dc3",
  pageTypeSlug: "page-type",
  slug: "temper-eso-trait-map",
  definition: "the number the game has for one trait on one kind of piece",
  pluralSlug: "temper-eso-trait-maps",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-trait-num", "text-property/trait-family", "text-property/trait-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/trait-family", required: true, many: false },
    { pageProperty: "text-property/trait-id", required: true, many: false },
    { pageProperty: "number-property/eso-trait-num", required: true, many: false },
  ],
} as const satisfies PageType
