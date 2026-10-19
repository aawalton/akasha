import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterRotationReading = {
  id: "01a1557f-ab1f-77ac-8712-4cb4dff8f2b5",
  type: "page-type/module",
  slug: "character-rotation-reading",
  definition: "a character's rotation reading worked out of the catalog and the last captures",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills and their tooltips are read from the character's last reading of each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character with a bar whose reading kept no skills is refused until a reload keeps them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar's multipliers are worked out by the metric calculator from the build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal is scaled by the average critical heal and by healing done and taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar's weapon style is read from the build's weapons on that bar.",
    },
  ],
  createdAt: "2026-10-19T18:49:52.670Z",
  updatedAt: "2026-10-19T19:31:54.334Z",
} as const satisfies Module
