import type { TextProperty } from "@akasha/pages-system/text-property"

export type RecipeName = string

export const recipeName = {
  id: "01a0626e-c112-7021-824e-6c062090140e",
  pageTypeSlug: "text-property",
  slug: "recipe-name",
  propertySlug: "recipe-name",
  definition: "the name a craftable recipe is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
