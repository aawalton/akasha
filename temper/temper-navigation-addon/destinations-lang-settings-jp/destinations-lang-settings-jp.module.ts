import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJp = {
  id: "01a06269-2a23-7075-b788-11cea0558322",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jp",
  definition: "the destinations settings strings in Japanese, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
