import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperDebuffMinor = TemperCatalogThing

export const temperDebuffMinor = {
  id: "01a05fc5-94cf-7f43-9797-17fbafcb401e",
  pageTypeSlug: "page-type",
  slug: "temper-debuff-minor",
  definition: "a harmful effect the game names Minor",
  pluralSlug: "temper-debuff-minors",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
} as const satisfies PageType
