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
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A character's bank visit date is still read, so an old record is not refused.",
    },
  ],
  createdAt: "2026-09-02T04:57:23.388Z",
  updatedAt: "2026-10-10T14:40:09.857Z",
} as const satisfies Module
