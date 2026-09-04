import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
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
  extendsSlug: "page-type/temper-character-thing",
  partSlugs: [
    "boolean-property/is-checkpoint",
    "number-property/version-number",
    "text-property/build",
    "text-property/build-hash",
    "text-property/checkpoint-name",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "build", required: true, many: false },
    { pagePropertySlug: "version-number", required: true, many: false },
    { pagePropertySlug: "build-hash", required: true, many: false },
    { pagePropertySlug: "is-checkpoint", required: false, many: false },
    { pagePropertySlug: "checkpoint-name", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A version is kept so an earlier arrangement can be returned to.",
    },
    {
      invariantKind: "departure",
      statement: "A version number rises by one for each version one build takes.",
    },
    {
      invariantKind: "departure",
      statement: "A version carrying no checkpoint name was taken as the build changed.",
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
