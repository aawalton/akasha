import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoCurseIds } from "../properties/eso-curse-ids.number-property.ts"

export type TemperCurse = TemperCatalogThing & {
  esoCurseIds?: EsoCurseIds
}

export const temperCurse = {
  id: "01a05fc5-94d2-7b6d-ac6a-2a3a21b68f41",
  pageTypeSlug: "page-type",
  slug: "temper-curse",
  definition: "a lasting affliction a character takes on",
  pluralSlug: "temper-curses",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["number-property/eso-curse-ids"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-curse-ids", required: false, many: true, max: null },
  ],
} as const satisfies PageType
