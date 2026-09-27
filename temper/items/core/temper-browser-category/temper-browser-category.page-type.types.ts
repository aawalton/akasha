import type { BrowserCategoryParent } from "akasha/temper/items/core/temper-browser-category/properties/browser-category-parent.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperBrowserCategory = TemperThing & {
  displayOrder: DisplayOrder
  parent?: BrowserCategoryParent
}
