import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterLinesLanding = {
  id: "01a15589-7ec5-775c-8353-ac6f1c90b185",
  type: "page-type/module",
  slug: "character-lines-landing",
  definition: "lines landed in a file beside each character they are of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are landed over page-service rather than over the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lines of a character with no page stay unlanded, and each such character is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's page names the file the first time lines land beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which lines are new is judged by the kind of line, never here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's name folds to its page's slug with its accents taken off first.",
    },
  ],
  createdAt: "2026-10-19T19:00:36.676Z",
  updatedAt: "2026-10-19T19:20:19.591Z",
} as const satisfies Module
