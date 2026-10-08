import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillCollapsibleCard = {
  id: "01a0642c-5bab-77bc-bd5f-4f4709582c75",
  type: "page-type/module",
  slug: "skill-collapsible-card",
  definition: "a card holding a collapsed skill",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's description is drawn in the colors the game's markup names.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.787Z",
  updatedAt: "2026-09-27T05:37:54.000Z",
} as const satisfies Module
