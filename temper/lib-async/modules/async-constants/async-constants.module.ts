import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncConstants = {
  id: "01a0606a-1c54-7a06-8b76-419e5170ac50",
  type: "page-type/module",
  slug: "async-constants",
  definition: "the frame budget, the stall bounds and the delays the scheduler is tuned by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame time is written in seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stall threshold is written in frames per second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delay is written in milliseconds.",
    },
  ],
} as const satisfies Module
