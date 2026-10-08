import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterAchievementsPanelCard = {
  id: "01a06421-f74b-7d4b-bfa1-cf2d5df70013",
  type: "page-type/module",
  slug: "character-achievements-panel-card",
  definition: "the achievements each selected character has earned, by category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The achievement tally the aggregate view walks is handed in as data rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The achievement tally is built from the achievement-category catalog by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from the character achievements completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:35:06.000Z",
} as const satisfies Module
