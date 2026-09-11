import type { CharacterRoles } from "akasha/temper/characters/temper-account-characters/properties/character-roles.relation-property.types.ts"
import type { FirstName } from "akasha/temper/characters/temper-account-characters/properties/first-name.text-property.types.ts"
import type { LiveBuildId } from "akasha/temper/characters/temper-account-characters/properties/live-build-id.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/things/properties/eso-character-id.text-property.types.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  esoCharacterId: EsoCharacterId
  accountPage: AccountPage
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: CharacterRoles
}
