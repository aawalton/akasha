import type { TextProperty } from "@akasha/pages/text-property"

export type DisplayMode = string

export const displayMode = {
  id: "01a06193-6ca0-7dfd-91bc-9bc2c64a4173",
  pageTypeSlug: "text-property",
  slug: "display-mode",
  propertySlug: "display-mode",
  definition: "whether a value is said as a whole or as one tick",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
