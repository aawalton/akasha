import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryBankTrace = {
  id: "01a06258-b528-744f-9bd2-f905f500edb0",
  type: "module",
  slug: "inventory-bank-trace",
  definition: "the timing traces kept over recent bank sessions, phase by phase",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The traces of the ten most recent bank sessions are kept.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest trace goes when a further session opens.",
    },
    {
      invariantKind: "departure",
      statement: "The trace of the session that opened last is kept a second time on its own.",
    },
  ],
} as const satisfies Module
