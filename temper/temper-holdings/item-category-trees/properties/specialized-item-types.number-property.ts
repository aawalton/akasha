import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SpecializedItemTypes = number

export const specializedItemTypes = {
  id: "01a05fcb-fd31-75e2-a639-16f22bd626ed",
  pageTypeSlug: "number-property",
  slug: "specialized-item-types",
  propertySlug: "specialized-item-types",
  definition: "a specialized item type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
