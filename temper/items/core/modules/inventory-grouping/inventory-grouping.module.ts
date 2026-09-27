import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryGrouping = {
  id: "01a0626e-3e05-702f-9116-c504ffbe4049",
  type: "page-type/module",
  slug: "inventory-grouping",
  definition: "everything an account holds filed by where it sits or what it is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries the values its slot's own link was read with, for its tooltip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's trait type goes to the tooltip only with the trait text read with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot whose own link has no trait shows no trait text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slot with no sell value recorded sells for nothing, since one above 0 is recorded.",
    },
  ],
} as const satisfies Module
