import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const armor = {
  id: "01a05fc5-94cd-70e6-aaf9-bd4eb8cb7733",
  type: "number-property",
  slug: "armor",
  propertySlug: "armor",
  definition: "the resistance a target carries",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
