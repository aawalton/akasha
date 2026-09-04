import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stockReconcilePlan = {
  id: "01a060d9-44cd-7adb-a1ad-5ce340c6cd3d",
  pageTypeSlug: "module",
  slug: "stock-reconcile-plan",
  definition: "whether a character withdraws or deposits to reach the count it is meant to carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shortfall draws no more than the open storage tier can give.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus deposits no more than the open storage tier's cap leaves room for.",
    },
    {
      invariantKind: "departure",
      statement: "A plan moving zero items names neither withdrawal nor deposit.",
    },
  ],
} as const satisfies Module
