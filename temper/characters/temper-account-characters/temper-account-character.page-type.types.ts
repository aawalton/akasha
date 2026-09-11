import type { AccountPage } from "../../things/properties/account-page.text-property.types.ts"
import type { EsoCharacterId } from "../../things/properties/eso-character-id.text-property.types.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { CharacterRoles } from "./properties/character-roles.relation-property.types.ts"
import type { FirstName } from "./properties/first-name.text-property.types.ts"
import type { LiveBuildId } from "./properties/live-build-id.text-property.types.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  esoCharacterId: EsoCharacterId
  accountPage: AccountPage
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: CharacterRoles
}
