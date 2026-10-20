import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingQueue = {
  id: "01a15a59-7597-7dfe-a7b8-016602262066",
  type: "page-type/module",
  slug: "landing-queue",
  definition: "the readings and fights a look found, waiting to land while the looks go on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A look never waits on a landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is added while a landing runs lands in the next landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One landing runs at a time, in the order things were added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a failed landing held waits for the next landing and is said in the log.",
    },
  ],
  createdAt: "2026-10-20T17:26:14.678Z",
  updatedAt: "2026-10-20T17:26:14.678Z",
} as const satisfies Module
