import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterSkillLine = {
  id: "01a0608a-c135-79d5-91c5-4cf48adc59f3",
  type: "page-type/domain",
  slug: "temper-character-skill-line",
  definition: "the skill lines an Elder Scrolls Online character advances",
  parts: ["module/skill-line-category-data", "module/skill-line-template", "module/skill-lines"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The skill lines are read from the skill line pages into the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A class line names its category by the category page's key rather than by that page's slug.",
    },
  ],
} as const satisfies Domain
