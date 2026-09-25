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
      statement: "Each completion's type is inferred from the zod schema this module's code holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The schema describes a completion body as the tree stores it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list the saved variables stored as an object numbered from one is read as an array.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying a key the schema does not declare is refused.",
    },
  ],
} as const satisfies Module
