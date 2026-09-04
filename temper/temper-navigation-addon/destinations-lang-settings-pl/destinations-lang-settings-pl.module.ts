import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsPl = {
  id: "01a06269-2a28-7913-8558-54fb79b1dbcf",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-pl",
  definition: "the destinations settings strings in Polish, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
