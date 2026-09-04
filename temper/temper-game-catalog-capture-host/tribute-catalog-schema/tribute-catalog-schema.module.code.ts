import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type {
  TributePatronCatalogCard,
  TributePatronCatalogEntry,
} from "@akasha/temper-capture-shapes/tribute-catalog"
import { z } from "zod"

export const tributePatronCatalogCardSchema = z
  .object({
    baseCardName: z.string(),
    upgradeCardName: z.string(),
  })
  .strict()

export const tributePatronCatalogEntrySchema = z
  .object({
    name: z.string(),
    categoryName: z.string(),
    collectibleId: z.number(),
    cards: z.record(z.coerce.number(), tributePatronCatalogCardSchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof tributePatronCatalogCardSchema, TributePatronCatalogCard>()
assertSchemaMatchesPayload<typeof tributePatronCatalogEntrySchema, TributePatronCatalogEntry>()

export const tributeCatalogSchema = z.record(z.coerce.number(), tributePatronCatalogEntrySchema)

export type TributeCatalog = z.infer<typeof tributeCatalogSchema>
