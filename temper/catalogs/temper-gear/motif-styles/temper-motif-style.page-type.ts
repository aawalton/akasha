import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"
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
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/collection-index",
    "text-property/drop-sources",
    "text-property/source-description",
  ],
  properties: [
    { pageProperty: "number-property/collection-index", required: true, many: false },
    { pageProperty: "text-property/source-description", required: true, many: false },
    { pageProperty: "text-property/drop-sources", required: false, many: true, maxCount: null },
  ],
} as const satisfies PageType
