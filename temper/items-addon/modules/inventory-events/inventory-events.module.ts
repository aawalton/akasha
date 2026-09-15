import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryEvents = {
  id: "01a06258-b52b-7a61-a1ab-0439cd103604",
  type: "module",
  slug: "inventory-events",
  definition: "the game events the add-on listens to, and what each one refreshes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bank visit scans the bag that visit opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slot the add-on changed at a bank is judged again as any other slot is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is used or opened while a bank visit still has moves in flight.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A closing bank is what dispatches the uses a visit's withdrawals earned.",
    },
  ],
} as const satisfies Module
