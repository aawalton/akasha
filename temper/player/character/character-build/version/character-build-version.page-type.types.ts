import type { BuildHash } from "akasha/temper/player/character/build/build-hash/properties/build-hash.text-property.types.ts"
import type { BuildCharacterName } from "akasha/temper/player/character/character-build/properties/build-character-name.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/player/character/character-build/properties/build-target-count.number-property.types.ts"
import type { CharacterBuildVersionBuild } from "akasha/temper/player/character/character-build/version/properties/character-build-version-build.relation-property.types.ts"
import type { CheckpointName } from "akasha/temper/player/character/character-build/version/properties/checkpoint-name.text-property.types.ts"
import type { IsCheckpoint } from "akasha/temper/player/character/character-build/version/properties/is-checkpoint.boolean-property.types.ts"
import type { VersionNumber } from "akasha/temper/player/character/character-build/version/properties/version-number.number-property.types.ts"
import type { CharacterRoles } from "akasha/temper/player/character/temper-account-character/properties/character-roles.multi-relation-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type CharacterBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  build: CharacterBuildVersionBuild
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
  characterName?: BuildCharacterName
  targetCount?: BuildTargetCount
  roles?: CharacterRoles
}
