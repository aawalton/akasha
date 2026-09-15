import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stated = {
  id: "01a08e08-9bc5-777c-957f-47a336328803",
  type: "module",
  slug: "stated",
  definition: "text as it was written, or nothing where nothing was written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text written as nothing at all is nothing rather than empty text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text already nothing stays nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text carrying a space is text, because a space was written.",
    },
  ],
} as const satisfies Module
