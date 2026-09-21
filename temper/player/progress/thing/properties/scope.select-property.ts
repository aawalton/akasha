import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const scope = {
  id: "01a05fc6-81fe-702d-b91e-6a8fb0278170",
  type: "page-type/select-property",
  slug: "scope",
  propertySlug: "scope",
  definition: "how widely a task reaches across an account",
  values: ["account", "all_characters", "character", "next_character"],
  types: "ts",
} as const satisfies SelectProperty
