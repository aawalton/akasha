import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFx02 = {
  id: "01a06269-2a15-7bec-a615-957ea99a2c0b",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fx-02",
  definition: "one run of the destinations settings strings in French with English fallbacks",
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
