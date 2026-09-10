import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Books = "jsonl"

export const books = {
  id: "01a06343-f9f7-7004-8521-33a45a47b9b8",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "books",
  propertySlug: "books",
  definition: "the books a lore collection holds, one book to a line",
  properties: [
    { pageProperty: "number-property/book-index", required: true, many: false },
    { pageProperty: "text-property/book-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book here is a book a player finds in the world and reads into a collection.",
    },
  ],
} as const satisfies PagePropertyEntry
