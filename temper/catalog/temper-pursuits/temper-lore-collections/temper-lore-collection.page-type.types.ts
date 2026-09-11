import type { Books } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/properties/books.page-property-entry.types.ts"
import type { EsoCollectionIndex } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/properties/eso-collection-index.number-property.types.ts"
import type { EsoLoreCategoryId } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/properties/eso-lore-category-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"

export type TemperLoreCollection = TemperPursuitThing & {
  esoLoreCategoryId: EsoLoreCategoryId
  esoCollectionIndex: EsoCollectionIndex
  books: Books
}
