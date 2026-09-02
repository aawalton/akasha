import type { RecipeCatalogList } from "@akasha/temper-capture-shapes/recipe-catalog"
import type { TraitResearchCatalogCraftType } from "@akasha/temper-capture-shapes/trait-research-catalog"
import { assertSchemaMatchesPayload } from "@temper/shared-capture-host/assert-schema-matches-payload"
import { z } from "zod"

const recipeCatalogRecipeSchema = z.object({ name: z.string() }).strict()

const recipeCatalogListSchema = z
  .object({
    name: z.string(),
    recipes: z.record(z.coerce.number(), recipeCatalogRecipeSchema),
  })
  .strict()

export const recipeCatalogSchema = z.record(z.coerce.number(), recipeCatalogListSchema)

assertSchemaMatchesPayload<typeof recipeCatalogSchema, Record<number, RecipeCatalogList>>()

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
