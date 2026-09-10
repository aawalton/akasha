import type { List } from "@akasha/pages/page-property"
import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type EquipTypes = List<number>

export const equipTypes = {
  id: "01a05fcb-fd2f-727e-baa1-ef9361ca6fdb",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "equip-types",
  propertySlug: "equip-types",
  definition: "a place on the body The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
