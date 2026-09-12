import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const libSetsLocInstallLocalization = {
  id: "01a061d7-7bb9-7125-b72f-e3bd28b4db73",
  type: "module",
  slug: "lib-sets-loc-install-localization",
  definition: "the German and English tables made into the library's localization",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The localization table is created here with German and English alone.",
    },
    {
      invariantKind: "departure",
      statement: "The on and off labels are placed on the fallback language alone.",
    },
  ],
} as const satisfies Module
