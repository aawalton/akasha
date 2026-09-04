import type { Module } from "@akasha/code-system/module"

export const companionsInventoryMatcher = {
  id: "01a0611d-84dd-7692-b051-cdbafe3f791d",
  pageTypeSlug: "module",
  slug: "companions-inventory-matcher",
  definition: "finding the best item a companion holds for each gear slot a build asks for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item is scored for nearness rather than matched exactly.",
    },
  ],
} as const satisfies Module
