import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperQuality = TemperCatalogThing

export const temperQuality = {
  id: "01a05fd1-d43f-7460-806b-41a2697dcbed",
  pageTypeSlug: "page-type",
  slug: "temper-quality",
  definition: "the grade a piece is made at",
  pluralSlug: "temper-qualities",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "available", required: true, many: false },
  ],
} as const satisfies PageType
