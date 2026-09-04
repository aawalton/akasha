import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleDuplicate = {
  id: "01a0603c-c1d7-79c4-89bc-1293587ca4fc",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-duplicate",
  definition: "the command copying a category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the category rule copied" }],
  helpNotes: [
    "the copy is unlocked and inactive whatever the original was.",
    "an id no category rule carries is refused by that id.",
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
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
