import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { CompanionId } from "../../things/properties/companion-id.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { CompanionRoles } from "./properties/companion-roles.relation-property.ts"

export type TemperCompanionProgress = TemperCharacterThing & {
  companionId: CompanionId
  accountPage: AccountPage
  roles?: CompanionRoles
}
