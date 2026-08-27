import type {
  LoreLibraryCatalogBook,
  LoreLibraryCatalogCategory,
  LoreLibraryCatalogCollection,
} from "@temper/game-collections-lore-capture-core/lore-library-catalog"
import { assertSchemaMatchesPayload } from "@temper/shared-capture-host/assert-schema-matches-payload"
import { z } from "zod"

export const loreLibraryBookSchema = z
  .object({
    name: z.string(),
  })
  .strict()

export const loreLibraryCollectionSchema = z
  .object({
    name: z.string(),
    books: z.record(z.coerce.number(), loreLibraryBookSchema),
  })
  .strict()

export const loreLibraryCategorySchema = z
  .object({
    name: z.string(),
    collections: z.record(z.coerce.number(), loreLibraryCollectionSchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof loreLibraryBookSchema, LoreLibraryCatalogBook>()
assertSchemaMatchesPayload<typeof loreLibraryCollectionSchema, LoreLibraryCatalogCollection>()
assertSchemaMatchesPayload<typeof loreLibraryCategorySchema, LoreLibraryCatalogCategory>()

export const loreLibraryCatalogSchema = z.record(z.coerce.number(), loreLibraryCategorySchema)

export type LoreLibraryCatalog = z.infer<typeof loreLibraryCatalogSchema>
