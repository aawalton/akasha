import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionRecord = {
  id: "01a0607a-9cbc-7c27-9e61-4050a73b66e7",
  type: "page-type/module",
  slug: "completion-record",
  definition: "the whole of what an account, character or companion has finished",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each completion's shape and a zod shape in this module's test are held equal at typecheck.",
    },
  ],
} as const satisfies Module
