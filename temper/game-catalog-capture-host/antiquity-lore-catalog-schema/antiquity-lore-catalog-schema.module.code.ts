import { assertSchemaMatchesPayload } from "akasha/temper/capture-host/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import type { AntiquityLoreCatalogEntry } from "akasha/temper/capture-shapes/antiquity-lore-catalog/antiquity-lore-catalog.module.code.ts"
import { z } from "zod"

export const antiquityLoreCatalogEntrySchema = z
  .object({
    name: z.string(),
    categoryId: z.number(),
    categoryName: z.string(),
    setId: z.number(),
    totalLoreEntries: z.number(),
  })
  .strict()

assertSchemaMatchesPayload<typeof antiquityLoreCatalogEntrySchema, AntiquityLoreCatalogEntry>()

export const antiquityLoreCatalogSchema = z.record(
  z.coerce.number(),
  antiquityLoreCatalogEntrySchema
)

export type AntiquityLoreCatalog = z.infer<typeof antiquityLoreCatalogSchema>
