import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchWeaponTypeFilter = {
  id: "01a0613a-e0b2-7929-9188-fe5bbdecdc45",
  pageTypeSlug: "module",
  slug: "search-weapon-type-filter",
  definition: "the weapon type of an item, narrowed by a multiselect of twelve weapon-type numbers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The weapon type filter also adds the selected weapon numbers to the server request.",
    },
    {
      invariantKind: "absence",
      statement:
        "Three weapon-type numbers below the highest offered number are left out of the options.",
    },
  ],
} as const satisfies Module
