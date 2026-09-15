import type { CharacterRoles } from "akasha/temper/character/temper-account-character/properties/character-roles.relation-property.types.ts"
import type { FirstName } from "akasha/temper/character/temper-account-character/properties/first-name.text-property.types.ts"
import type { LiveBuildId } from "akasha/temper/character/temper-account-character/properties/live-build-id.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  esoCharacterId: EsoCharacterId
  accountPage: AccountPage
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: CharacterRoles
}
