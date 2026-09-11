import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { Category } from "akasha/temper/things/properties/category.text-property.types.ts"
import type { CategoryId } from "akasha/temper/things/properties/category-id.text-property.types.ts"
import type { CompanionId } from "akasha/temper/things/properties/companion-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/things/properties/eso-character-id.text-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"
import type { Parent } from "akasha/temper/things/properties/parent.text-property.types.ts"

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
