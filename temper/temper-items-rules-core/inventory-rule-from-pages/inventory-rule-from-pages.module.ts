import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleFromPages = {
  id: "01a072ae-f698-75c0-bcb4-f2b491d93e68",
  pageTypeSlug: "module",
  slug: "inventory-rule-from-pages",
  definition: "a rule a player holds read back from the page and the entries beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule's id is the part of its page's slug after the leading `rule-`.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rule falls among the rules is read from `display-order` alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A condition value is read as JSON where that value parses as JSON and as text otherwise.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property the page leaves unsaid is left off the rule rather than written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A row short of a key every rule has is no rule and is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A row beside the page short of a field its shape declares is left out.",
    },
    {
      invariantKind: "gap",
      statement: "Two rules of one account with one display order are ordered by nothing.",
    },
  ],
} as const satisfies Module
