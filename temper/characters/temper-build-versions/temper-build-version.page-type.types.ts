import type { Build } from "akasha/temper/characters/temper-build-versions/properties/build.text-property.types.ts"
import type { BuildHash } from "akasha/temper/characters/temper-build-versions/properties/build-hash.text-property.types.ts"
import type { CheckpointName } from "akasha/temper/characters/temper-build-versions/properties/checkpoint-name.text-property.types.ts"
import type { IsCheckpoint } from "akasha/temper/characters/temper-build-versions/properties/is-checkpoint.boolean-property.types.ts"
import type { VersionNumber } from "akasha/temper/characters/temper-build-versions/properties/version-number.number-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"

export type TemperBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  build: Build
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
}
