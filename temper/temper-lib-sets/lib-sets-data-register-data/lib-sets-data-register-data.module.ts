import type { Module } from "@akasha/code-system/module"

export const libSetsDataRegisterData = {
  id: "01a061fc-cee8-7e0a-a57e-257c1300fc25",
  pageTypeSlug: "module",
  slug: "lib-sets-data-register-data",
  definition: "the generated set tables placed onto the library global",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Data for sets of a newer API version is stripped when the live API is older.",
    },
    {
      invariantKind: "departure",
      statement: "The stripping is handed to the library as a function rather than run at load.",
    },
  ],
} as const satisfies Module
