import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillBarPanelCard = {
  id: "01a0642f-8c32-7734-89b3-d6023374ce17",
  type: "page-type/module",
  slug: "companion-skill-bar-panel-card",
  definition: "a panel card stating the skills on a companion's bar",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:13:52.818Z",
  updatedAt: "2026-09-27T11:54:35.000Z",
} as const satisfies Module
