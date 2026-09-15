import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionStorageCapability = {
  id: "01a06100-3bdf-73c8-af37-4cb6f942667f",
  type: "module",
  slug: "action-storage-capability",
  definition:
    "whether an action needs the item in the backpack before the action can be carried out",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An action leaving an item in place needs no backpack.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Using an item at a named destination needs no backpack.",
    },
  ],
} as const satisfies Module
