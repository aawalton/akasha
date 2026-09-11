import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const trigger = {
  id: "01a06193-6ca2-78f9-be96-80eb545306ff",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "trigger",
  propertySlug: "trigger",
  definition: "what has to happen before an effect fires",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
