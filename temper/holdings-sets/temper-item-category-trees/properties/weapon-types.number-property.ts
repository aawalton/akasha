import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type WeaponTypes = List<number>

export const weaponTypes = {
  id: "01a05fcb-fd32-7104-a7bf-b581f92aa91e",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "weapon-types",
  propertySlug: "weapon-types",
  definition: "a weapon type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
