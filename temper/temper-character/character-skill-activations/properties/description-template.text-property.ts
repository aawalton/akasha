import type { TextProperty } from "@akasha/pages-system/text-property"

export type DescriptionTemplate = string

export const descriptionTemplate = {
  id: "01a05fcd-f549-76df-a978-2b95a2597642",
  pageTypeSlug: "text-property",
  slug: "description-template",
  propertySlug: "description-template",
  definition: "what a skill does, with a slot for each number the game fills in",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
