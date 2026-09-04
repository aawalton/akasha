import type { Module } from "@akasha/code-system/module"

export const libSetsLocRestInstallLocalizationRest = {
  id: "01a061d7-7bc3-709c-9996-2e91117905f5",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-rest-install-localization-rest",
  definition: "six later language tables added onto the library's localization",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The localization table already exists when these six are added.",
    },
  ],
} as const satisfies Module
