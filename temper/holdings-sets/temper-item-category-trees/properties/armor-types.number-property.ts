import type { List } from "@akasha/pages/page-property"
import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ArmorTypes = List<number>

export const armorTypes = {
  id: "01a05fcb-fd2f-745c-a3dd-7f72bedb3bf8",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "armor-types",
  propertySlug: "armor-types",
  definition: "an armor type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
