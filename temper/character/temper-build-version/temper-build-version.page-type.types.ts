import type { Build } from "akasha/temper/character/temper-build-version/properties/build.text-property.types.ts"
import type { BuildHash } from "akasha/temper/character/temper-build-version/properties/build-hash.text-property.types.ts"
import type { CheckpointName } from "akasha/temper/character/temper-build-version/properties/checkpoint-name.text-property.types.ts"
import type { IsCheckpoint } from "akasha/temper/character/temper-build-version/properties/is-checkpoint.boolean-property.types.ts"
import type { VersionNumber } from "akasha/temper/character/temper-build-version/properties/version-number.number-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"

export type TemperBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  build: Build
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
}
