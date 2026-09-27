import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillSelectionDialog = {
  id: "01a0642c-5bad-78c1-afbd-877051c08f76",
  type: "page-type/module",
  slug: "skill-selection-dialog",
  definition: "the dialog selecting a skill",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the skill line category pages.",
    },
  ],
} as const satisfies Module
