import type { TextProperty } from "@akasha/pages/text-property"

export type SlotCategory = string

export const slotCategory = {
  id: "01a05fcd-aed0-7287-87ee-60a32ae62e26",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "slot-category",
  propertySlug: "slot-category",
  definition: "the group a jewelry place falls in",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
