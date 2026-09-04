import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { CadwellCatalogLevel } from "@akasha/temper-capture-shapes/cadwell-catalog"
import { z } from "zod"

const cadwellCatalogPOISchema = z
  .object({
    name: z.string(),
    order: z.number(),
  })
  .strict()

const cadwellCatalogZoneSchema = z
  .object({
    name: z.string(),
    order: z.number(),
    pois: z.record(z.number(), cadwellCatalogPOISchema),
  })
  .strict()

const cadwellCatalogLevelSchema = z
  .object({
    zones: z.record(z.number(), cadwellCatalogZoneSchema),
  })
  .strict()

export const cadwellCatalogSchema = z.record(z.number(), cadwellCatalogLevelSchema)

assertSchemaMatchesPayload<typeof cadwellCatalogSchema, Record<number, CadwellCatalogLevel>>()
