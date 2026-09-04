import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { PoiCatalogZone } from "@akasha/temper-capture-shapes/poi-catalog"
import { z } from "zod"

const poiCatalogEntrySchema = z
  .object({
    name: z.string(),
    poiType: z.number(),
  })
  .strict()

const poiCatalogZoneSchema = z
  .object({
    name: z.string(),
    pois: z.record(z.number(), poiCatalogEntrySchema),
  })
  .strict()

export const poiCatalogSchema = z.record(z.number(), poiCatalogZoneSchema)

assertSchemaMatchesPayload<typeof poiCatalogSchema, Record<number, PoiCatalogZone>>()
