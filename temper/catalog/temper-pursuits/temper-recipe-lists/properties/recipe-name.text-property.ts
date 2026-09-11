import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const recipeName = {
  id: "01a0626e-c112-7021-824e-6c062090140e",
  type: "text-property",
  slug: "recipe-name",
  propertySlug: "recipe-name",
  definition: "the name a craftable recipe is shown under",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
