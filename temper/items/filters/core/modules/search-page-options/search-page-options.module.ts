import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchPageOptions = {
  id: "01a0e0ee-912a-7881-b214-c61f4ff8a237",
  type: "page-type/module",
  slug: "search-page-options",
  definition: "the options a search filter offers, read from the pages each numbered by the game",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An option is a page's title offered under the game's number for that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The options are ordered by the game's number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page numbered 0, or stating no number or no title, is no option.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option the game names apart from its page's title is offered by that name.",
    },
  ],
} as const satisfies Module
