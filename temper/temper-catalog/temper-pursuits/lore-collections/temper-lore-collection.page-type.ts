import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Books } from "./properties/books.page-property-entry.ts"
import type { EsoCollectionIndex } from "./properties/eso-collection-index.number-property.ts"
import type { EsoLoreCategoryId } from "./properties/eso-lore-category-id.number-property.ts"

export type TemperLoreCollection = TemperPursuitThing & {
  esoLoreCategoryId: EsoLoreCategoryId
  esoCollectionIndex: EsoCollectionIndex
  books: Books
}

export const temperLoreCollection = {
  id: "01a06343-f9f7-7005-838d-006a4cec0e4f",
  pageTypeSlug: "page-type",
  slug: "temper-lore-collection",
  definition: "a grouping the game files lore library books under",
  pluralSlug: "temper-lore-collections",
  extendsSlug: "page-type/temper-pursuit-thing",
  partSlugs: [
    "number-property/book-index",
    "number-property/eso-collection-index",
    "number-property/eso-lore-category-id",
    "page-property-entry/books",
    "text-property/book-name",
  ],
  properties: [
    { pagePropertySlug: "eso-lore-category-id", required: true, many: false },
    { pagePropertySlug: "eso-collection-index", required: true, many: false },
    { pagePropertySlug: "books", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection is numbered inside its lore category rather than across them all.",
    },
    {
      invariantKind: "departure",
      statement: "Shalidor's Library is lore category 1.",
    },
  ],
} as const satisfies PageType
