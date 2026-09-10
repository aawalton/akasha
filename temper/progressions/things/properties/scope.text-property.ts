import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Scope = string

export const scope = {
  id: "01a05fc6-81fe-702d-b91e-6a8fb0278170",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "scope",
  propertySlug: "scope",
  definition: "how widely a task reaches across an account",
  maxLength: 20,
  nameFormat: "name-format/lower-snake-case",
} as const satisfies TextProperty
