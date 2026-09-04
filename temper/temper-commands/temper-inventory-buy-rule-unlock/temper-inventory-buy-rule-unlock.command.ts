import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleUnlock = {
  id: "01a0603c-c1d1-7388-9210-2b06caa8d25f",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-unlock",
  definition: "the command unlocking a buy rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the buy rule unlocked" }],
  helpNotes: ["unlocking a buy rule already unlocked changes nothing."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a buy rule already unlocked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule carries refuses the call.",
    },
  ],
} as const satisfies Command
