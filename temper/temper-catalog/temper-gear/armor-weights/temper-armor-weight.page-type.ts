import type { PageType } from "@akasha/pages/page-type"
import type { ArmorBaseValue } from "../../../catalogs/temper-gear/properties/armor-base-value.number-property.ts"
import type { IsStandard } from "../../../catalogs/temper-gear/properties/is-standard.boolean-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  baseValue: ArmorBaseValue
  isStandard: IsStandard
}

export const temperArmorWeight = {
  id: "01a05fd1-d430-7564-8721-434ab188698f",
  pageTypeSlug: "page-type",
  slug: "temper-armor-weight",
  definition: "how heavy a piece of armor is made",
  pluralSlug: "temper-armor-weights",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["boolean-property/is-standard", "number-property/armor-base-value"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor-base-value", required: true, many: false },
    { pageProperty: "boolean-property/is-standard", required: true, many: false },
    { pageProperty: "text-property/skill-line-id", required: true, many: false },
  ],
} as const satisfies PageType
