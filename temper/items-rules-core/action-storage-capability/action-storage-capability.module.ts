import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const actionStorageCapability = {
  id: "01a06100-3bdf-73c8-af37-4cb6f942667f",
  pageTypeSlug: "module",
  slug: "action-storage-capability",
  definition:
    "whether an action needs the item in the backpack before the action can be carried out",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An action leaving an item in place needs no backpack.",
    },
    {
      invariantKind: "departure",
      statement: "Using an item at a named destination needs no backpack.",
    },
  ],
} as const satisfies Module
