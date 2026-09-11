import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { CollectionIndex } from "../properties/collection-index.number-property.types.ts"
import type { DropSources } from "../properties/drop-sources.text-property.types.ts"
import type { SourceDescription } from "../properties/source-description.text-property.types.ts"

export type TemperMotifStyle = TemperCatalogThing & {
  collectionIndex: CollectionIndex
  sourceDescription: SourceDescription
  dropSources?: DropSources
}
