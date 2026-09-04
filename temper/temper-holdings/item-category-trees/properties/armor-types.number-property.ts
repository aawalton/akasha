import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ArmorTypes = number

export const armorTypes = {
  id: "01a05fcb-fd2f-745c-a3dd-7f72bedb3bf8",
  pageTypeSlug: "number-property",
  slug: "armor-types",
  propertySlug: "armor-types",
  definition: "an armor type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
