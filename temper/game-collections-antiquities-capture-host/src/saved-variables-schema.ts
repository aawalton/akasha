import type { AntiquityLoreCatalogEntry } from "@akasha/temper-capture-shapes/antiquity-lore-catalog"
import { assertSchemaMatchesPayload } from "@temper/shared-capture-host/assert-schema-matches-payload"
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
