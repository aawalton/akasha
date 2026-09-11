import type { CollectionIndex } from "akasha/temper/catalog/temper-gear/properties/collection-index.number-property.types.ts"
import type { DropSources } from "akasha/temper/catalog/temper-gear/properties/drop-sources.text-property.types.ts"
import type { SourceDescription } from "akasha/temper/catalog/temper-gear/properties/source-description.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperMotifStyle = TemperCatalogThing & {
  collectionIndex: CollectionIndex
  sourceDescription: SourceDescription
  dropSources?: DropSources
}
