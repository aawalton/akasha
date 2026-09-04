import type { Module } from "@akasha/code-system/module"

export const inventoryRuleRows = {
  id: "01a068f6-dedf-7995-b1bc-45a280695fe1",
  pageTypeSlug: "module",
  slug: "inventory-rule-rows",
  definition: "the columns a rule listing prints and the row one item rule prints as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A column set is stated once and shared by every listing that prints it.",
    },
    {
      invariantKind: "departure",
      statement: "An item rule prints the fields its columns name and no others.",
    },
    {
      invariantKind: "absence",
      statement: "No rule is read or written here.",
    },
  ],
} as const satisfies Module
