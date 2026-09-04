import type { TextProperty } from "@akasha/pages-system/text-property"

export type CooldownScope = string

export const cooldownScope = {
  id: "01a06193-6ca1-72e9-8534-eb54b1e77eca",
  pageTypeSlug: "text-property",
  slug: "cooldown-scope",
  propertySlug: "scope",
  definition: "how widely a cooldown reduction reaches",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
