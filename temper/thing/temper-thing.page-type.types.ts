import type { Page } from "akasha/page/page.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { CompanionId } from "akasha/temper/thing/properties/companion-id.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperThing = Page & {
  key?: Key
  displayOrder?: DisplayOrder
  accountPage?: AccountPage
  companionId?: CompanionId
  esoCharacterId?: EsoCharacterId
}
