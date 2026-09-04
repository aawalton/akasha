import type { Module } from "../../code-system/modules/module.page-type.ts"

export const speech = {
  id: "01a05b55-e06e-713c-ae5c-d556cabac43e",
  pageTypeSlug: "module",
  slug: "speech",
  definition:
    "written text flattened and cut into pieces short enough for a voice to render at once",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Markup is flattened away before anything is cut.",
    },
    {
      invariantKind: "departure",
      statement: "A fenced code block is spoken as a note that code was left out.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence is cut at a stop followed by space.",
    },
    {
      invariantKind: "departure",
      statement:
        "Sentences are packed together up to the budget rather than sent one sentence at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A word longer than the budget is broken inside itself.",
    },
    {
      invariantKind: "departure",
      statement: "The number of pieces is capped.",
    },
    {
      invariantKind: "departure",
      statement: "A piece past the cap is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A continuous reading is cut at paragraphs rather than at sentences.",
    },
    {
      invariantKind: "departure",
      statement: "A piece says whether a paragraph opens at that piece.",
    },
    {
      invariantKind: "departure",
      statement:
        "A leading bracketed marker is taken off each paragraph before the paragraph is spoken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a voice model.",
    },
  ],
} as const satisfies Module
