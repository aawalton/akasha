import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const minedItemRows = {
  id: "01a0640f-8510-7325-9208-0be4870d37e6",
  type: "page-type/module",
  slug: "mined-item-rows",
  definition: "a mined item read out of a stored row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the row does not have reads as empty rather than as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row holds its numbers, flags and set bonuses as JSON gives them rather than as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field held as a type other than the one it is read as reads as empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set bonus that will not parse is passed over rather than raised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no readable set bonus has no set bonus rather than an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant that cannot be read writes as empty rather than as the epoch.",
    },
  ],
} as const satisfies Module
