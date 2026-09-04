import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RecipeItemId = number

export const recipeItemId = {
  id: "01a0626e-c112-72f4-b2d2-af3e22205118",
  pageTypeSlug: "number-property",
  slug: "recipe-item-id",
  propertySlug: "recipe-item-id",
  definition: "the game's own id for the item a recipe is learned from",
  max: null,
} as const satisfies NumberProperty
