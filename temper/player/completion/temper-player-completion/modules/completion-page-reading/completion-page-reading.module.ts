import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPageReading = {
  id: "01a0e0bc-edc8-7bf1-b01c-22d1864866a8",
  type: "page-type/module",
  slug: "completion-page-reading",
  definition: "the completion pages read and held with the skill catalogue",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list names every completion page type read and the keys read of each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a page, so the caller hands in the rows of each page type.",
    },
  ],
} as const satisfies Module
