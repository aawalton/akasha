import { assertSchemaMatchesPayload } from "akasha/temper/capture-host/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import type { RecipeCatalogList } from "akasha/temper/capture-shapes/recipe-catalog/recipe-catalog.module.code.ts"
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
