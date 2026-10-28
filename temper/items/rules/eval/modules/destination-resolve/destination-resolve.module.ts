import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationResolve = {
  id: "01a06137-f96b-7043-97c6-458a3d722f28",
  type: "page-type/module",
  slug: "destination-resolve",
  definition: "the concrete destination a by-priority rule destination resolves to for an item",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination that is not a by-priority token resolves to the token unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock rule carrying a chain resolves to the surplus tier's destination.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock chain is planned by the one planner the game side plans it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resolved stock chain carries the fill tier's target quantity beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fill tier no character in priority order passes has a target quantity of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain with no fill tier leaves the flat destination to answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move-to chain resolves to its first house with room for the whole stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A move-to chain reaching no house with known room resolves to its first storage leg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house's room is the environment's, so the game and a reading outside it agree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fill tier naming a character carries its own target quantity.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any lookup answering unknown makes the whole destination resolution indeterminate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character already claiming the same item key is skipped during use resolution.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A master motif is ordered over every eligible character by the ordering the game side uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every other item kind resolves to the first eligible character without reading the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item with no item key resolves to its holder where its known fact says it is unlearned.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.419Z",
  updatedAt: "2026-10-28T20:47:31.599Z",
} as const satisfies Module
