import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleShow = {
  id: "01a0603c-c1d4-7e72-bcc5-fb55fe3c992c",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-show",
  definition: "the command giving back one per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the per-item rule given back" },
    { said: "--tsv", takes: "give one tab-separated row rather than JSON" },
  ],
  helpNotes: ["an id no per-item rule carries is refused by that id."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
