import type { BuildHash } from "akasha/temper/player/character/build/build-hash/properties/build-hash.text-property.types.ts"
import type { BuildCharacterName } from "akasha/temper/player/character/character-build/properties/build-character-name.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/player/character/character-build/properties/build-target-count.number-property.types.ts"
import type { BaseRoles } from "akasha/temper/player/character/companion-build/properties/base-roles.select-property.types.ts"
import type { CharacterRoles } from "akasha/temper/player/character/temper-account-character/properties/character-roles.multi-relation-property.types.ts"
import type { Build } from "akasha/temper/player/character/temper-build-version/properties/build.text-property.types.ts"
import type { CheckpointName } from "akasha/temper/player/character/temper-build-version/properties/checkpoint-name.text-property.types.ts"
import type { IsCheckpoint } from "akasha/temper/player/character/temper-build-version/properties/is-checkpoint.boolean-property.types.ts"
import type { VersionNumber } from "akasha/temper/player/character/temper-build-version/properties/version-number.number-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type TemperBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  build: Build
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
  characterName?: BuildCharacterName
  targetCount?: BuildTargetCount
  roles?: CharacterRoles
  baseRoles?: BaseRoles
}
