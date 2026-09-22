import type { Page } from "akasha/page/page.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"
import type { CompanionId } from "akasha/temper/thing/properties/companion-id.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperThing = Page & {
  key?: Key
  icon?: Icon
  displayOrder?: DisplayOrder
  accountPage?: AccountPage
  companionId?: CompanionId
  esoCharacterId?: EsoCharacterId
}
