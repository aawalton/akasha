import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const verdict = {
  id: "01a05c87-a15f-79e8-9268-c8bf1735c3e6",
  type: "page-type/domain",
  slug: "verdict",
  definition: "a judgement on something measured, with what it covered and what it found",
  parts: ["module/reading-channel", "module/verdict-shape", "module/verdict-text"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A failing judgement has at least one finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement states the moment the judgement was observed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding naming no place reads as unattributed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here measures anything.",
    },
  ],
} as const satisfies Domain
