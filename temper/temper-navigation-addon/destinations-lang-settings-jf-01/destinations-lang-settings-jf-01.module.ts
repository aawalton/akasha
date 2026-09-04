import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJf01 = {
  id: "01a06269-2a1b-77d2-acb3-d0a410ababcb",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jf-01",
  definition: "one run of the destinations settings strings in Japanese with English fallbacks",
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
