import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const completionVisibility = {
  id: "01a05fcd-f557-7c35-987a-480c078751bb",
  type: "text-property",
  slug: "completion-visibility",
  propertySlug: "completion-visibility",
  definition: "who a player lets read what that player has finished",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
