import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { Build } from "./properties/build.text-property.ts"
import type { BuildHash } from "./properties/build-hash.text-property.ts"
import type { CheckpointName } from "./properties/checkpoint-name.text-property.ts"
import type { IsCheckpoint } from "./properties/is-checkpoint.boolean-property.ts"
import type { VersionNumber } from "./properties/version-number.number-property.ts"

export type TemperBuildVersion = TemperCharacterThing & {
  accountPage: AccountPage
  build: Build
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
}
