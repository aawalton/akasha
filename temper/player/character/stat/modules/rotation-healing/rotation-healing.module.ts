import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotationHealing = {
  id: "01a13c1f-1abb-7f13-9091-5df53ed127a3",
  type: "page-type/module",
  slug: "rotation-healing",
  definition: "the healing per second a character gives itself over a fight cast by a neutral rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each global cooldown casts the first skill in bar order whose effect has run out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill whose effect has no duration has always run out, so it can always be cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where no skill can be cast, the global cooldown goes to a light attack that heals none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The front bar's skills come before the back bar's, and swapping bars costs nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ultimate is cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield counts as healing its whole strength, as if it were all absorbed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick counts only where it falls inside the fight.",
    },
  ],
  createdAt: "2026-10-14T20:33:53.850Z",
  updatedAt: "2026-10-14T20:33:53.850Z",
} as const satisfies Module
