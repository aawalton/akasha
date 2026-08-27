import type { PoiCatalogZone } from "@temper/game-navigation-capture-core/poi-catalog"
import { assertSchemaMatchesPayload } from "@temper/shared-capture-host/assert-schema-matches-payload"
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
