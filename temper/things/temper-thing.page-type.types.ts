import type { Page } from "../../pages/page.page-type.ts"
import type { AccountPage } from "./properties/account-page.text-property.ts"
import type { Category } from "./properties/category.text-property.ts"
import type { CategoryId } from "./properties/category-id.text-property.ts"
import type { CompanionId } from "./properties/companion-id.text-property.ts"
import type { DisplayOrder } from "./properties/display-order.number-property.ts"
import type { EsoCharacterId } from "./properties/eso-character-id.text-property.ts"
import type { Icon } from "./properties/icon.text-property.ts"
import type { Key } from "./properties/key.text-property.ts"
import type { Parent } from "./properties/parent.text-property.ts"

export type TemperThing = Page & {
  key?: Key
  icon?: Icon
  displayOrder?: DisplayOrder
  accountPage?: AccountPage
  categoryId?: CategoryId
  category?: Category
  companionId?: CompanionId
  esoCharacterId?: EsoCharacterId
  parent?: Parent
}
