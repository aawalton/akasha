import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsPl = {
  id: "01a06269-2a28-7913-8558-54fb79b1dbcf",
  type: "page-type/module",
  slug: "destinations-lang-settings-pl",
  definition: "the destinations settings strings in Polish, joined from its runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
