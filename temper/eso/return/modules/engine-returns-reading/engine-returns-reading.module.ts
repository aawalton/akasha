import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineReturnsReading = {
  id: "01a0d3c6-7dec-7fdd-a7c3-5b0d7ec8ac1e",
  type: "page-type/module",
  slug: "engine-returns-reading",
  definition: "the reading taking every function's return kinds out of the documentation",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The documentation is tokenised by the reading the declarations are written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type that reading gives back is narrowed to one of the kinds kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type this does not name is a number, because an enumeration is a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A return that may be absent keeps the kind it has when it is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version is read off the documentation's own first heading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every name is sorted here, so what is written turns only where the game did.",
    },
  ],
} as const satisfies Module
