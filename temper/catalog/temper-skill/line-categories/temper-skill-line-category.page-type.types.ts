import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSkillLineCategory = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
}
