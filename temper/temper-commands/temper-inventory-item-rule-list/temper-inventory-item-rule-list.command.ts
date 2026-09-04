import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleList = {
  id: "01a0603c-c1d3-7fdf-bf4e-51b3a559a428",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-list",
  definition: "the command naming every per-item rule",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the rules as JSON rather than as tab-separated rows" }],
  helpNotes: ["the rules are given in the order they are held."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are given in the order the settings hold.",
    },
  ],
} as const satisfies Command
