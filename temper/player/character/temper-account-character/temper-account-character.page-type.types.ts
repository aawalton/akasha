import type { CharacterClass } from "akasha/temper/player/character/temper-account-character/properties/character-class.relation-property.types.ts"
import type { CharacterRace } from "akasha/temper/player/character/temper-account-character/properties/character-race.relation-property.types.ts"
import type { CharacterRoles } from "akasha/temper/player/character/temper-account-character/properties/character-roles.multi-relation-property.types.ts"
import type { Fights } from "akasha/temper/player/character/temper-account-character/properties/fights.file-property.types.ts"
import type { FirstName } from "akasha/temper/player/character/temper-account-character/properties/first-name.text-property.types.ts"
import type { LiveBuildId } from "akasha/temper/player/character/temper-account-character/properties/live-build-id.text-property.types.ts"
import type { Readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.types.ts"
import type { RemovedReadings } from "akasha/temper/player/character/temper-account-character/properties/removed-readings.file-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  esoCharacterId: EsoCharacterId
  accountPage: AccountPage
  race: CharacterRace
  class: CharacterClass
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: CharacterRoles
  fights?: Fights
  readings?: Readings
  removedReadings?: RemovedReadings
}
