import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const completionVisibility = {
  id: "01a05fcd-f557-7c35-987a-480c078751bb",
  type: "page-type/text-property",
  slug: "completion-visibility",
  propertySlug: "completion-visibility",
  definition: "who a player lets read what that player has finished",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:48:48.343Z",
  updatedAt: "2026-09-24T16:58:05.000Z",
} as const satisfies TextProperty
