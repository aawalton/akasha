import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const housingBuildMyHousesTab = {
  id: "01a06128-d5c5-728f-acef-bd15630d6f1b",
  pageTypeSlug: "module",
  type: "module",
  slug: "housing-build-my-houses-tab",
  definition: "building the controls of the my-houses tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
} as const satisfies Module
