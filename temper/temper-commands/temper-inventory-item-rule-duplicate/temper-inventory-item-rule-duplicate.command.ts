import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleDuplicate = {
  id: "01a0603c-c1d3-7aad-9ae3-451fe2454676",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-duplicate",
  definition: "the command copying a per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the per-item rule copied" }],
  helpNotes: [
    "the copy is unlocked and inactive whatever the original was.",
    "an id no per-item rule carries is refused by that id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The copy is unlocked.",
    },
    {
      invariantKind: "departure",
      statement: "The copy is inactive.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
