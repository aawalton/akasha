import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryConsolidateDest = {
  id: "01a06151-3707-766e-bfa9-91d05b3b9c5c",
  pageTypeSlug: "module",
  slug: "inventory-consolidate-dest",
  definition: "whether a destination gathers one thing from every character into one place",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination gathering stock is known by the name the destination carries.",
    },
  ],
} as const satisfies Module
