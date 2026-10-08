import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleRows = {
  id: "01a068f6-dedf-7995-b1bc-45a280695fe1",
  type: "page-type/module",
  slug: "inventory-rule-rows",
  definition: "the columns a rule listing prints and the row an item rule prints as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A column set is stated once and shared by every listing that prints that column set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item rule prints the fields its columns name and no other field.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule is read or written here.",
    },
  ],
  createdAt: "2026-09-03T20:30:04.511Z",
  updatedAt: "2026-09-22T10:18:13.000Z",
} as const satisfies Module
