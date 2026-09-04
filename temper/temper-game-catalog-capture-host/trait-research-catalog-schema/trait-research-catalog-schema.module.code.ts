import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { TraitResearchCatalogCraftType } from "@akasha/temper-capture-shapes/trait-research-catalog"
import { z } from "zod"

const traitResearchCatalogTraitSchema = z.object({ name: z.string() }).strict()

const traitResearchCatalogLineSchema = z
  .object({
    name: z.string(),
    traits: z.record(z.coerce.number(), traitResearchCatalogTraitSchema),
  })
  .strict()

const traitResearchCatalogCraftTypeSchema = z
  .object({
    name: z.string(),
    lines: z.record(z.coerce.number(), traitResearchCatalogLineSchema),
  })
  .strict()

export const traitResearchCatalogSchema = z.record(
  z.coerce.number(),
  traitResearchCatalogCraftTypeSchema
)

assertSchemaMatchesPayload<
  typeof traitResearchCatalogSchema,
  Record<number, TraitResearchCatalogCraftType>
>()
