import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationsLangSettingsEs02 = {
  id: "01a06269-2a09-79ae-8c73-f4cc54ba7cee",
  type: "module",
  slug: "destinations-lang-settings-es-02",
  definition: "one run of the destinations settings strings in Spanish",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
