import type { CompanionRoles } from "akasha/temper/character/temper-companion-progress/properties/companion-roles.relation-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"
import type { CompanionId } from "akasha/temper/thing/properties/companion-id.text-property.types.ts"

export type TemperCompanionProgress = TemperCharacterThing & {
  companionId: CompanionId
  accountPage: AccountPage
  roles?: CompanionRoles
}
