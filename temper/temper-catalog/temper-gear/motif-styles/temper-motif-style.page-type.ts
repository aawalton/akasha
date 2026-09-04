import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { CollectionIndex } from "../properties/collection-index.number-property.ts"
import type { DropSources } from "../properties/drop-sources.text-property.ts"
import type { SourceDescription } from "../properties/source-description.text-property.ts"

export type TemperMotifStyle = TemperCatalogThing & {
  collectionIndex: CollectionIndex
  sourceDescription: SourceDescription
  dropSources?: DropSources
}

export const temperMotifStyle = {
  id: "01a05fd1-d433-75e8-b089-3c870c7d6917",
  pageTypeSlug: "page-type",
  slug: "temper-motif-style",
  definition: "a crafting style a piece is made in the look of",
  pluralSlug: "temper-motif-styles",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: [
    "number-property/collection-index",
    "text-property/drop-sources",
    "text-property/source-description",
  ],
  properties: [
    { pagePropertySlug: "collection-index", required: true, many: false },
    { pagePropertySlug: "source-description", required: true, many: false },
    { pagePropertySlug: "drop-sources", required: false, many: true, max: null },
  ],
} as const satisfies PageType
