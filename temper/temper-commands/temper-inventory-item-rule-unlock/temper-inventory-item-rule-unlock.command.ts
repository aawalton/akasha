import type { Command } from "@akasha/command-system/command"

export const temperInventoryItemRuleUnlock = {
  id: "01a0603c-c1d4-7ce4-89db-b0f353aba838",
  pageTypeSlug: "command",
  slug: "temper-inventory-item-rule-unlock",
  definition: "the command unlocking a per-item rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the per-item rule unlocked" }],
  helpNotes: ["unlocking a per-item rule already unlocked changes nothing."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a per-item rule already unlocked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
} as const satisfies Command
