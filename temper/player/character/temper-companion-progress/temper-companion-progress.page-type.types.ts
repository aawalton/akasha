import type { CompanionRoles } from "akasha/temper/player/character/temper-companion-progress/properties/companion-roles.multi-relation-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"
import type { CompanionId } from "akasha/temper/thing/properties/companion-id.relation-property.types.ts"

export type TemperCompanionProgress = TemperCharacterThing & {
  companionId: CompanionId
  accountPage: AccountPage
  roles?: CompanionRoles
}
