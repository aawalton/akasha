import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { CategoryId } from "akasha/temper/thing/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperSourceCategory = TemperCatalogThing & {
  categoryId: CategoryId
  displayOrder: DisplayOrder
}
