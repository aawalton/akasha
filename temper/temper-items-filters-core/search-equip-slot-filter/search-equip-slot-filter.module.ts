import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchEquipSlotFilter = {
  id: "01a0613a-e0a7-7f9d-b9bd-ff1e3517930d",
  pageTypeSlug: "module",
  slug: "search-equip-slot-filter",
  definition: "the equip slot an item occupies, narrowed by a multiselect of thirteen slot numbers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The equip slot filter also adds the selected slot numbers to the server request.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no equip type fails a non-empty selection.",
    },
  ],
} as const satisfies Module
