import type { CompanionRoles } from "akasha/temper/characters/temper-companion-progresses/properties/companion-roles.relation-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { CompanionId } from "akasha/temper/things/properties/companion-id.text-property.types.ts"

export type TemperCompanionProgress = TemperCharacterThing & {
  companionId: CompanionId
  accountPage: AccountPage
  roles?: CompanionRoles
}
