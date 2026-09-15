import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerAsk = {
  id: "01a0640f-8510-7705-b1ef-543766ffde5e",
  type: "page-type/module",
  slug: "answer-ask",
  definition: "a question asked in a browser carried to the page store and answered back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who is not signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is carried as a JSON body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store's answer is carried back unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller reads the store's own shape.",
    },
  ],
} as const satisfies Module
