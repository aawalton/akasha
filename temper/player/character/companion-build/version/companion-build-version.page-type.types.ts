import type { BuildHash } from "akasha/temper/player/character/build/build-hash/properties/build-hash.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/player/character/character-build/properties/build-target-count.number-property.types.ts"
import type { CheckpointName } from "akasha/temper/player/character/character-build/version/properties/checkpoint-name.text-property.types.ts"
import type { IsCheckpoint } from "akasha/temper/player/character/character-build/version/properties/is-checkpoint.boolean-property.types.ts"
import type { VersionNumber } from "akasha/temper/player/character/character-build/version/properties/version-number.number-property.types.ts"
import type { BaseRoles } from "akasha/temper/player/character/companion-build/properties/base-roles.select-property.types.ts"
import type { CompanionBuildVersionBuild } from "akasha/temper/player/character/companion-build/version/properties/companion-build-version-build.relation-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type CompanionBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
  targetCount?: BuildTargetCount
  baseRoles?: BaseRoles
  build: CompanionBuildVersionBuild
}
