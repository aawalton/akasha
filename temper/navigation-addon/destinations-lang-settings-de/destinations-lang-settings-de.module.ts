import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const destinationsLangSettingsDe = {
  id: "01a06269-29ff-7795-a251-4101d115fc7b",
  type: "module",
  slug: "destinations-lang-settings-de",
  definition: "the destinations settings strings in German, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
