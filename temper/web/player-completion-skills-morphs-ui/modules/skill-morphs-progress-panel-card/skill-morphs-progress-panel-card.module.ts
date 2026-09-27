import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillMorphsProgressPanelCard = {
  id: "01a06270-883d-7000-98b7-a23674b65603",
  type: "page-type/module",
  slug: "skill-morphs-progress-panel-card",
  definition: "how far each chosen character has taken every skill with a picked morph",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Choosing no character reckons every character together.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill line with no morphable skill is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's title is its completion category page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each skill line category is labelled with its skill line category page's title.",
    },
  ],
} as const satisfies Module
