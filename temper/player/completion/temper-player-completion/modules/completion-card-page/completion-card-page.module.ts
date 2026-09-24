import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardPage = {
  id: "01a0c68c-bdb9-7f89-8784-301fd414ad08",
  type: "page-type/module",
  slug: "completion-card-page",
  definition: "the completion-category page a card is, and the card a page of that kind is",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card's page is slugged as the tab holding that card joined to the card's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both answers are read off the category tree rather than off the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node hung beneath a card is no card, so neither answer reaches one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card's address is built only by the tests, so it lives in the test fixtures.",
    },
  ],
} as const satisfies Module
