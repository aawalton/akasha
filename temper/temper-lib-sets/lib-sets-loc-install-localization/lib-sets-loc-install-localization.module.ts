import type { Module } from "@akasha/code-system/module"

export const libSetsLocInstallLocalization = {
  id: "01a061d7-7bb9-7125-b72f-e3bd28b4db73",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-install-localization",
  definition: "the German and English tables made into the library's localization",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The localization table is created here holding German and English alone.",
    },
    {
      invariantKind: "departure",
      statement: "The on and off labels are placed on the fallback language alone.",
    },
  ],
} as const satisfies Module
