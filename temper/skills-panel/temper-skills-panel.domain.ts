import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperSkillsPanel = {
  id: "01a090b6-a3f2-7389-972c-8722513c19f0",
  type: "domain",
  slug: "temper-skills-panel",
  definition: "the panel a player spends a character's skill points in",
  parts: ["module/skills-panel-points"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel is the game's own, and an add-on only adds to what it draws.",
    },
  ],
} as const satisfies Domain
