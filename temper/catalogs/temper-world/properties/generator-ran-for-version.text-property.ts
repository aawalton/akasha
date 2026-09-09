import type { TextProperty } from "@akasha/pages/text-property"

export type GeneratorRanForVersion = string

export const generatorRanForVersion = {
  id: "01a05fc4-7a92-760e-9d6f-0e6cdd38c794",
  pageTypeSlug: "text-property",
  slug: "generator-ran-for-version",
  propertySlug: "generator-ran-for-version",
  definition: "the game build the generator last ran for",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
