import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDeclarationPages = {
  id: "01a0ca80-d20e-7a92-bda7-f18eec52e6a6",
  type: "page-type/module",
  slug: "eso-declaration-pages",
  definition: "the pages a command writes a generated declaration onto",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is one a command writes where the page states that command wrote it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages those are is read from the stamp rather than from a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are answered in the order their slugs sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose declaration file is not there is answered holding nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page made carries the same stamp as the pages already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page naming a page among its parts is found by reading those parts.",
    },
  ],
} as const satisfies Module
