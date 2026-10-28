import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const houseDestination = {
  id: "01a18409-4bc1-7643-a36d-135427c1f31e",
  type: "page-type/module",
  slug: "house-destination",
  definition:
    "the owned house a house destination names, and the furnishings that house has room for",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house destination names its house by the house's collectible id, as `house:<id>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item put in a house is placed there as a furnishing rather than stored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house's room is counted in items, one placed furnishing to an item of a stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house's room for a limit type is its limit less the count placed, at the last scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house no reading has scanned since its limits were recorded has no known room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house with no known room is not yet scanned, which is told apart from a house that is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stacks are allotted houses smallest first, each the first house in its chain with room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An allotment spends a house's room, so the stacks it takes never pass the room recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stack allotted a house finds that house when judged alone, so it never goes back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chain's leg for a stack is the first house with room, else its first storage leg.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A furnishing read before its limit type was recorded counts as a traditional item.",
    },
  ],
  createdAt: "2026-10-28T19:42:44.161Z",
  updatedAt: "2026-10-28T20:47:31.599Z",
} as const satisfies Module
