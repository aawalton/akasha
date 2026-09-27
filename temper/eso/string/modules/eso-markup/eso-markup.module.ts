import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoMarkup = {
  id: "01a0e155-9dba-7f72-9426-d3555dba05d2",
  type: "page-type/module",
  slug: "eso-markup",
  definition: "the pieces the game's text markup splits a string into",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text the markup colors is a piece in that color until the markup ends it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An end closes the innermost color still open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon the markup names is a piece of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link or an underline the markup wraps is the words it wraps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker the markup does not close or cannot read is dropped from the text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reader of the game's markup splits it here.",
    },
  ],
} as const satisfies Module
