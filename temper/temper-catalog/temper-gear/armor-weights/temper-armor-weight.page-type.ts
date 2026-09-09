import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { ArmorBaseValue } from "../properties/armor-base-value.number-property.ts"
import type { IsStandard } from "../properties/is-standard.boolean-property.ts"

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
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/armor-base-value", required: true, many: false },
    { pagePropertySlug: "boolean-property/is-standard", required: true, many: false },
    { pagePropertySlug: "text-property/skill-line-id", required: true, many: false },
  ],
} as const satisfies PageType
