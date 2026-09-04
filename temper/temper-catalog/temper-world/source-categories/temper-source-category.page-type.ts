import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSourceCategory = TemperCatalogThing

export const temperSourceCategory = {
  id: "01a05fc4-7a95-78b9-afe6-0a16b2b185e3",
  pageTypeSlug: "page-type",
  slug: "temper-source-category",
  definition: "a group the sources of a character's numbers fall into",
  pluralSlug: "temper-source-categories",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "category-id", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
