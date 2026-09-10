import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { CollectionIndex } from "../properties/collection-index.number-property.ts"
import type { DropSources } from "../properties/drop-sources.text-property.ts"
import type { SourceDescription } from "../properties/source-description.text-property.ts"

export type TemperMotifStyle = TemperCatalogThing & {
  collectionIndex: CollectionIndex
  sourceDescription: SourceDescription
  dropSources?: DropSources
}
