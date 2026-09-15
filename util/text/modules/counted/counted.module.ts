import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const counted = {
  id: "01a08ccc-aca8-7215-b4dd-560d25d104b5",
  type: "module",
  slug: "counted",
  definition: "a count said beside the thing counted, in the singular or the plural",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of one is said with the singular.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other count is said with the plural.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of none is said with the plural.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plural is the singular with an `s` at its end.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A count is written as digits rather than as a word.",
    },
  ],
} as const satisfies Module
