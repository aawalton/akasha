import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const webEvalEnv = {
  id: "01a06151-370e-7c65-8456-25031d62896e",
  pageTypeSlug: "module",
  slug: "web-eval-env",
  definition:
    "the evaluation environment the web build hands the matcher, drawn from captured holdings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reader here answers from the captured holdings rather than from the game.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies Module
