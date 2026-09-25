import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { ItemBrowserSourceId } from "akasha/temper/catalog/world/item-browser-source/properties/item-browser-source-id.number-property.types.ts"
import type { ItemBrowserPlaceKind } from "akasha/temper/catalog/world/zone/properties/item-browser-place-kind.number-property.types.ts"

export type TemperItemBrowserSource = TemperCatalogThing & {
  itemBrowserPlaceKind: ItemBrowserPlaceKind
  itemBrowserSourceId: ItemBrowserSourceId
}
