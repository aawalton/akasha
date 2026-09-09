import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperBuffOther = TemperCatalogThing

export const temperBuffOther = {
  id: "01a05fc5-94cf-702c-9d2a-71e8577501c9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-other",
  definition: "a helpful effect the game names neither Major nor Minor",
  pluralSlug: "temper-buff-others",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
  ],
} as const satisfies PageType
