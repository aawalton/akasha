import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { EsoCharacterId } from "../../things/properties/eso-character-id.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { CharacterRoles } from "./properties/character-roles.relation-property.ts"
import type { FirstName } from "./properties/first-name.text-property.ts"
import type { LiveBuildId } from "./properties/live-build-id.text-property.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  esoCharacterId: EsoCharacterId
  accountPage: AccountPage
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: CharacterRoles
}
