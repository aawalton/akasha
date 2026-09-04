import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleUpdate = {
  id: "01a0603c-c1d1-7778-bcb7-99cee8e25369",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-update",
  definition: "the command changing the fields of a buy rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the buy rule changed" },
    { said: "--target <n>", takes: "the total quantity to buy up to" },
    { said: "--source <name>", takes: "where the item is bought from" },
    { said: "--title <s>", takes: "a title the web shows" },
    { said: "--notes <s>", takes: "a note the web shows" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    { said: "--force", takes: "change it even where it is locked" },
  ],
  helpNotes: [
    "a locked buy rule is refused rather than changed, unless `--force` is said.",
    "a field the call names nothing for is left as it was.",
    "a title, a note and a goal are held for the web alone and never reach the addon.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A field the call names nothing for is left as it was.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule carries refuses the call.",
    },
  ],
} as const satisfies Command
