import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillLinesProgressPanelCard = {
  id: "01a06421-f74b-7777-a204-91862649001f",
  type: "page-type/module",
  slug: "companion-skill-lines-progress-panel-card",
  definition: "each companion's skill lines and the rank each has reached",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is its completion category page's.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:50:28.000Z",
} as const satisfies Module
