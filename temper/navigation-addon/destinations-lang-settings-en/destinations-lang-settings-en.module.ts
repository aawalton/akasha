import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationsLangSettingsEn = {
  id: "01a06269-2a05-7cb2-9b1f-230e3a0d3c0e",
  type: "module",
  slug: "destinations-lang-settings-en",
  definition: "the destinations settings strings in English, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
