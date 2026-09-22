import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCurrencyData = {
  id: "01a060d9-498b-782c-aa63-7f9ef5125ebe",
  type: "page-type/module",
  slug: "inventory-currency-data",
  definition: "every kind of money an account holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This table was written out from the inventory currency pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order of this table is the order a balance summary lists currencies in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A currency moved to another place reorders every balance summary shown.",
    },
  ],
} as const satisfies Module
