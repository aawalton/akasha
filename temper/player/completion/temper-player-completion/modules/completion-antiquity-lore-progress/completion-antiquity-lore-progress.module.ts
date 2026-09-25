import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAntiquityLoreProgress = {
  id: "01a06358-4f7c-77e7-a32e-20a4046028cd",
  type: "page-type/module",
  slug: "completion-antiquity-lore-progress",
  definition: "how much antiquity lore an account has dug up, category by category",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The antiquity catalog arrives as an argument rather than as an imported table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record entry is that many lore entries acquired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity the record says nothing about has no lore entries acquired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many lore entries an antiquity has is taken from the catalog.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
