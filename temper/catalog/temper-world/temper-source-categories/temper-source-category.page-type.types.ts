import type { CategoryId } from "../../../things/properties/category-id.text-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSourceCategory = TemperCatalogThing & {
  categoryId: CategoryId
  displayOrder: DisplayOrder
}
