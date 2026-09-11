import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { CategoryId } from "akasha/temper/things/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperSourceCategory = TemperCatalogThing & {
  categoryId: CategoryId
  displayOrder: DisplayOrder
}
