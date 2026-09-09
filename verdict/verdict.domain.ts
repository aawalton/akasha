import type { Domain } from "../domains/domain.page-type.ts"

export const verdict = {
  id: "01a05c87-a15f-79e8-9268-c8bf1735c3e6",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "verdict",
  definition: "a judgement on something measured, with what it covered and what it found",
  parts: [
    "module/outcome",
    "module/verdict-shape",
    "module/verdict-exit",
    "module/verdict-text",
    "module/reading-channel",
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
