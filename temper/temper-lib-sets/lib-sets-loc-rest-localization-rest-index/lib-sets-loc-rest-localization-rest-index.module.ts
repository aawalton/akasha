import type { Module } from "@akasha/code-system/module"

export const libSetsLocRestLocalizationRestIndex = {
  id: "01a061d7-7bc4-7579-be47-b39f086c097f",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-rest-localization-rest-index",
  definition: "one import that runs the later languages' localization install",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file holds a single import and declares nothing.",
    },
  ],
} as const satisfies Module
