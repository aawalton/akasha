import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBankTrace = {
  id: "01a06258-b528-744f-9bd2-f905f500edb0",
  type: "module",
  slug: "inventory-bank-trace",
  definition: "the timing traces kept over recent visits to a venue, phase by phase",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The traces of the ten most recent bank sessions are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The oldest trace goes when a further session opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace of the session that opened last is kept a second time on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A closed session takes the settling that follows it for five seconds and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One venue's visit is traced at a time, and opening a venue ends the visit before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merchant and a fence are traced as a banker is, into a ring of their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A venue with no instrument ends the traced visit rather than taking its settling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a venue's open handler spends is bracketed apart from what settles after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither bucket's brackets are subtracted twice from the unattributed remainder.",
    },
  ],
} as const satisfies Module
