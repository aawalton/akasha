import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webEvalEnv = {
  id: "01a06151-370e-7c65-8456-25031d62896e",
  type: "page-type/module",
  slug: "web-eval-env",
  definition:
    "the evaluation environment the web build hands the matcher, drawn from captured holdings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reader here answers from the captured holdings rather than from the game.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.598Z",
  updatedAt: "2026-09-21T15:36:01.000Z",
} as const satisfies Module
