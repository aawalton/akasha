import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const armorTypes = {
  id: "01a05fcb-fd2f-745c-a3dd-7f72bedb3bf8",
  type: "page-type/number-property",
  slug: "armor-types",
  propertySlug: "armor-types",
  definition: "an armor type The Elder Scrolls Online numbers",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
