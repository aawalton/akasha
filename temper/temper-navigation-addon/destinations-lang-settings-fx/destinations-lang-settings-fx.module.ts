import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFx = {
  id: "01a06269-2a16-72c7-a620-23f883db25ea",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fx",
  definition:
    "the destinations settings strings in French with English fallbacks, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
