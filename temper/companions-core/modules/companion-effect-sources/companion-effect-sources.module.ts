import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEffectSources = {
  id: "01a06152-c2c7-7dff-b7bf-68a31c3744ce",
  type: "page-type/module",
  slug: "companion-effect-sources",
  definition: "extractors turning a companion build into categorized metric effect sources",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The off-hand weapon damage fraction sits as a bare constant rather than in a table.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every source has a categoryId drawn from the shared SourceCategoryId union.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The class passive contributes a source only when the companion declares a classPassiveId.",
    },
  ],
} as const satisfies Module
