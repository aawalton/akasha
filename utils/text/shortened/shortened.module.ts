import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const shortened = {
  id: "01a0908e-2225-73cf-ab78-93caf2062757",
  pageTypeSlug: "module",
  type: "module",
  slug: "shortened",
  definition: "text held to a length, with an ellipsis at the end of text that was longer",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text no longer than the length is written out whole.",
    },
    {
      invariantKind: "departure",
      statement: "Text longer than the length keeps that length and an ellipsis follows it.",
    },
    {
      invariantKind: "departure",
      statement: "The ellipsis is the one character rather than three periods.",
    },
    {
      invariantKind: "departure",
      statement: "The length is sixty characters.",
    },
  ],
} as const satisfies Module
