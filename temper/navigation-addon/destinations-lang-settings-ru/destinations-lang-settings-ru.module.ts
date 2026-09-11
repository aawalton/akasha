import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationsLangSettingsRu = {
  id: "01a06269-2a2e-7c52-9a19-bad7a67086fb",
  type: "module",
  slug: "destinations-lang-settings-ru",
  definition: "the destinations settings strings in Russian, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
