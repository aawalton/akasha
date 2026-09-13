import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryBankTrace = {
  id: "01a06258-b528-744f-9bd2-f905f500edb0",
  type: "module",
  slug: "inventory-bank-trace",
  definition: "the timing traces kept over recent visits to a venue, phase by phase",
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
    {
      invariantKind: "departure",
      statement:
        "A closed session takes the settling that follows it for five seconds and no more.",
    },
    {
      invariantKind: "departure",
      statement:
        "One venue's visit is traced at a time, and opening a venue ends the visit before.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant and a fence are traced as a banker is, into a ring of their own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A venue with no instrument ends the traced visit rather than taking its settling.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a venue's open handler spends is bracketed apart from what settles after it.",
    },
    {
      invariantKind: "departure",
      statement: "Neither bucket's brackets are subtracted twice from the unattributed remainder.",
    },
  ],
} as const satisfies Module
