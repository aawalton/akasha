import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Books } from "./properties/books.page-property-entry.ts"
import type { EsoCollectionIndex } from "./properties/eso-collection-index.number-property.ts"
import type { EsoLoreCategoryId } from "./properties/eso-lore-category-id.number-property.ts"

export type TemperLoreCollection = TemperPursuitThing & {
  esoLoreCategoryId: EsoLoreCategoryId
  esoCollectionIndex: EsoCollectionIndex
  books: Books
}
