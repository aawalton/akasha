import type { TextProperty } from "@akasha/pages-system/text-property"

export type DisplayMode = string

export const displayMode = {
  id: "01a06193-6ca0-7dfd-91bc-9bc2c64a4173",
  pageTypeSlug: "text-property",
  slug: "display-mode",
  propertySlug: "display-mode",
  definition: "whether a value is said as a whole or as one tick",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
