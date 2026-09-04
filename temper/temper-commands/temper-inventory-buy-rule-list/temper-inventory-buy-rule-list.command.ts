import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleList = {
  id: "01a0603c-c1d0-7e92-8585-751f1a226c8f",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-list",
  definition: "the command naming every buy rule beside how far short of its target it falls",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give each rule as JSON rather than as tab-separated rows" }],
  helpNotes: [
    "each rule carries the quantity held now and the shortfall against its target.",
    "the account read is Alan's unless `USER_ID` names another.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each rule carries the quantity held now.",
    },
    {
      invariantKind: "departure",
      statement: "Each rule carries the shortfall against its target.",
    },
  ],
} as const satisfies Command
