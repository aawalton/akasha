import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const generatorRanForVersion = {
  id: "01a05fc4-7a92-760e-9d6f-0e6cdd38c794",
  type: "page-type/text-property",
  slug: "generator-ran-for-version",
  propertySlug: "generator-ran-for-version",
  definition: "the game build of the generator's last run",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
