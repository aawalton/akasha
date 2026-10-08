import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperSkillsPanel = {
  id: "01a090b6-a3f2-7389-972c-8722513c19f0",
  type: "page-type/domain",
  slug: "temper-skills-panel",
  definition: "the panel where a player spends a character's skill points",
  parts: ["module/skills-panel-points"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel is the game's own, and an add-on only adds to what it draws.",
    },
  ],
  createdAt: "2026-09-11T13:44:43.762Z",
  updatedAt: "2026-09-22T13:43:34.000Z",
} as const satisfies Domain
