import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDeclarationChunking = {
  id: "01a0ca7b-b401-7208-9822-ee9af5a08724",
  type: "page-type/module",
  slug: "eso-declaration-chunking",
  definition: "the pages a run of generated declaration groups is divided between",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group goes to the page already holding the name that group states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group no page holds goes to the page holding the group before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is left where it is, so a run changing nothing divides nothing again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page over the ceiling hands its last group to the page after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group handed past the last page makes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page left holding nothing goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page keeps the slug it has, and a page made takes the next number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is two digits, and the first page of a single-page run is unnumbered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or measures a body.",
    },
  ],
} as const satisfies Module
