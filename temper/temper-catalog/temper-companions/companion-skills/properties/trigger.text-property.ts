import type { TextProperty } from "@akasha/pages-system/text-property"

export type Trigger = string

export const trigger = {
  id: "01a06193-6ca2-78f9-be96-80eb545306ff",
  pageTypeSlug: "text-property",
  slug: "trigger",
  propertySlug: "trigger",
  definition: "what has to happen before an effect fires",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
