import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsPageContent = {
  id: "01a0642f-8c3a-7b91-8490-d1b8b3d052fb",
  type: "page-type/module",
  slug: "companions-page-content",
  definition: "what the companions page draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The builds are drawn once the stat pages a companion is scored by are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content that fails to load is worded by the Temper query error boundary.",
    },
  ],
} as const satisfies Module
