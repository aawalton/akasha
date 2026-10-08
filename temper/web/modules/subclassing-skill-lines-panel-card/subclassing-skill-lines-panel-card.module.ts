import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subclassingSkillLinesPanelCard = {
  id: "01a06421-f74b-7c10-81f6-98e711570037",
  type: "page-type/module",
  slug: "subclassing-skill-lines-panel-card",
  definition: "the subclassing skill lines the account has ranked up, by class",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:33:40.000Z",
} as const satisfies Module
