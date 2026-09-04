import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleUpdate = {
  id: "01a0603c-c1d4-7ad6-becc-0e7bd28a0a09",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-update",
  definition: "the command changing the fields of a per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the per-item rule changed" },
    { said: "--action <name>", takes: "what is done with the item when the rule fires" },
    { said: "--destination <d>", takes: "where the item goes, for the actions that move it" },
    { said: "--title <s>", takes: "a title the web shows" },
    { said: "--notes <s>", takes: "a note the web shows" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    { said: "--stock-quantity <n>", takes: "how many the destination is stocked up to" },
    { said: "--force", takes: "change it even where it is locked" },
  ],
  helpNotes: [
    "a locked per-item rule is refused rather than changed, unless `--force` is said.",
    "a field the call names nothing for is left as it was.",
    "a title, a note and a goal are held for the web alone and never reach the addon.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A field the call names nothing for is left as it was.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
