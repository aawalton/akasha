import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSetCategory = TemperCatalogThing

export const temperSetCategory = {
  id: "01a05fd1-d441-711d-bcc5-d8bf635f2b8f",
  pageTypeSlug: "page-type",
  slug: "temper-set-category",
  definition: "where a set is got from",
  pluralSlug: "temper-set-categories",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
