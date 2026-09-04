import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleLock = {
  id: "01a0603c-c1d7-740c-ba2b-29b12244bd79",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-lock",
  definition: "the command locking a category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the category rule locked" }],
  helpNotes: [
    "locking a category rule already locked changes nothing.",
    "a locked rule is refused an update or a deletion until it is unlocked or the call forces it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Locking a category rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
