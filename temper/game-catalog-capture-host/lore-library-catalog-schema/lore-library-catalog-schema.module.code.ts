import { assertSchemaMatchesPayload } from "akasha/temper/capture-host/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import type {
  LoreLibraryCatalogBook,
  LoreLibraryCatalogCategory,
  LoreLibraryCatalogCollection,
} from "akasha/temper/capture-shapes/lore-library-catalog/lore-library-catalog.module.code.ts"
import { z } from "zod"

const loreLibraryBookSchema = z
  .object({
    name: z.string(),
  })
  .strict()

const loreLibraryCollectionSchema = z
  .object({
    name: z.string(),
    books: z.record(z.coerce.number(), loreLibraryBookSchema),
  })
  .strict()

const loreLibraryCategorySchema = z
  .object({
    name: z.string(),
    collections: z.record(z.coerce.number(), loreLibraryCollectionSchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof loreLibraryBookSchema, LoreLibraryCatalogBook>()
assertSchemaMatchesPayload<typeof loreLibraryCollectionSchema, LoreLibraryCatalogCollection>()
assertSchemaMatchesPayload<typeof loreLibraryCategorySchema, LoreLibraryCatalogCategory>()

const loreLibraryCatalogSchema = z.record(z.coerce.number(), loreLibraryCategorySchema)

export type LoreLibraryCatalog = z.infer<typeof loreLibraryCatalogSchema>
