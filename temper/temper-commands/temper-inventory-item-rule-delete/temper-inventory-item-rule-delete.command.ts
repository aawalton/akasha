import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleDelete = {
  id: "01a0603c-c1d2-7862-9289-2b1f29d3c20e",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-delete",
  definition: "the command taking away a per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the per-item rule taken away" },
    { said: "--force", takes: "take it away even where it is locked" },
  ],
  helpNotes: [
    "a locked per-item rule is refused rather than taken away, unless `--force` is said.",
    "an id no per-item rule carries is refused by that id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
