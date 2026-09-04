import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleLock = {
  id: "01a0603c-c1d3-7b21-8e7e-1cbbd4192e8b",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-lock",
  definition: "the command locking a per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the per-item rule locked" }],
  helpNotes: [
    "locking a per-item rule already locked changes nothing.",
    "a locked rule is refused an update or a deletion until it is unlocked or the call forces it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Locking a per-item rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
