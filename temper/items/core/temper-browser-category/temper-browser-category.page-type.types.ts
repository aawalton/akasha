import type { BrowserArmorWeights } from "akasha/temper/items/core/temper-browser-category/properties/browser-armor-weights.multi-relation-property.types.ts"
import type { BrowserCategoryParent } from "akasha/temper/items/core/temper-browser-category/properties/browser-category-parent.relation-property.types.ts"
import type { BrowserEquipTypes } from "akasha/temper/items/core/temper-browser-category/properties/browser-equip-types.multi-relation-property.types.ts"
import type { BrowserItemTypes } from "akasha/temper/items/core/temper-browser-category/properties/browser-item-types.multi-relation-property.types.ts"
import type { BrowserMatch } from "akasha/temper/items/core/temper-browser-category/properties/browser-match.select-property.types.ts"
import type { BrowserSpecializedItemTypes } from "akasha/temper/items/core/temper-browser-category/properties/browser-specialized-item-types.multi-relation-property.types.ts"
import type { BrowserWeaponTypes } from "akasha/temper/items/core/temper-browser-category/properties/browser-weapon-types.multi-relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperBrowserCategory = TemperThing & {
  displayOrder: DisplayOrder
  parent?: BrowserCategoryParent
  match?: BrowserMatch
  itemTypes?: BrowserItemTypes
  specializedItemTypes?: BrowserSpecializedItemTypes
  weaponTypes?: BrowserWeaponTypes
  armorWeights?: BrowserArmorWeights
  equipTypes?: BrowserEquipTypes
}
