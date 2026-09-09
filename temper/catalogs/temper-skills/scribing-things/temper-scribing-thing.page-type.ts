import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { UespId } from "../properties/uesp-id.number-property.ts"

export type TemperScribingThing = TemperCatalogThing & {
  uespId: UespId
}

export const temperScribingThing = {
  id: "01a05fca-cb8c-73ea-beae-bd4ddb3a41f3",
  pageTypeSlug: "page-type",
  slug: "temper-scribing-thing",
  definition: "anything a scribed skill is written out of",
  pluralSlug: "temper-scribing-things",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/uesp-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "number-property/uesp-id", required: true, many: false },
  ],
} as const satisfies PageType
