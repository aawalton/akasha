import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsZh01 = {
  id: "01a06269-2a32-7fe5-90be-cf6544ef2f17",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-zh-01",
  definition: "one run of the destinations settings strings in Chinese",
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
