import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canListAtGuildTraderFilter = {
  id: "01a06100-3be7-7e16-98f5-59dabc92b040",
  pageTypeSlug: "module",
  slug: "can-list-at-guild-trader-filter",
  definition:
    "the Can List at Guild Trader condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canListAtGuildTrader` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `list` is offered no Can List at Guild Trader condition.",
    },
  ],
} as const satisfies Module
