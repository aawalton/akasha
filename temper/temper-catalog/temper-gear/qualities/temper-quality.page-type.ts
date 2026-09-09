import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.ts"

export type TemperQuality = TemperCatalogThing

export const temperQuality = {
  id: "01a05fd1-d43f-7460-806b-41a2697dcbed",
  pageTypeSlug: "page-type",
  slug: "temper-quality",
  definition: "the grade a piece is made at",
  pluralSlug: "temper-qualities",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
  ],
} as const satisfies PageType
