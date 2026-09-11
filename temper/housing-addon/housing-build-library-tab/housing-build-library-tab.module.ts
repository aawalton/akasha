import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const housingBuildLibraryTab = {
  id: "01a06128-d5c4-74dd-a2f6-6194d82b43c4",
  pageTypeSlug: "module",
  type: "module",
  slug: "housing-build-library-tab",
  definition: "building the controls of the community library tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
} as const satisfies Module
