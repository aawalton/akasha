import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const verdict = {
  id: "01a05c87-a15f-79e8-9268-c8bf1735c3e6",
  type: "domain",
  slug: "verdict",
  definition: "a judgement on something measured, with what it covered and what it found",
  parts: [
    "module/outcome",
    "module/reading-channel",
    "module/verdict-exit",
    "module/verdict-shape",
    "module/verdict-text",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A failing judgement has at least one finding.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement states the moment the judgement was observed.",
    },
    {
      invariantKind: "departure",
      statement: "A finding naming no place reads as unattributed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here measures anything.",
    },
  ],
} as const satisfies Domain
