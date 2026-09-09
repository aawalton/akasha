import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.ts"
import type { Build } from "./properties/build.text-property.ts"
import type { BuildHash } from "./properties/build-hash.text-property.ts"
import type { CheckpointName } from "./properties/checkpoint-name.text-property.ts"
import type { IsCheckpoint } from "./properties/is-checkpoint.boolean-property.ts"
import type { VersionNumber } from "./properties/version-number.number-property.ts"

export type TemperBuildVersion = TemperCharacterThing & {
  build: Build
  versionNumber: VersionNumber
  buildHash: BuildHash
  isCheckpoint?: IsCheckpoint
  checkpointName?: CheckpointName
}

export const temperBuildVersion = {
  id: "019dbb6c-51c0-7b3c-b483-0a739f32d9fb",
  pageTypeSlug: "page-type",
  slug: "temper-build-version",
  definition: "one saved revision of a character's build",
  pluralSlug: "temper-build-versions",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "boolean-property/is-checkpoint",
    "number-property/version-number",
    "text-property/build",
    "text-property/build-hash",
    "text-property/checkpoint-name",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/build", required: true, many: false },
    { pageProperty: "number-property/version-number", required: true, many: false },
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "boolean-property/is-checkpoint", required: false, many: false },
    { pageProperty: "text-property/checkpoint-name", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A version is kept so an earlier arrangement can be returned to.",
    },
    {
      invariantKind: "departure",
      statement: "Each version a build takes has the next version number.",
    },
    {
      invariantKind: "departure",
      statement: "A version with no checkpoint name was taken as the build changed.",
    },
    {
      invariantKind: "departure",
      statement: "Checkpoints are shown before the versions taken as the build changed.",
    },
    {
      invariantKind: "gap",
      statement: "The build metadata a version keeps is no declared property.",
    },
  ],
} as const satisfies PageType
