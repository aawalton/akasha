import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchWeaponTypeFilter = {
  id: "01a0613a-e0b2-7929-9188-fe5bbdecdc45",
  type: "page-type/module",
  slug: "search-weapon-type-filter",
  definition: "the weapon type of an item, narrowed by a multiselect of the weapon type pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The weapon type filter also adds the selected weapon numbers to the server request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The options are written into the addon from the weapon type pages as it compiles.",
    },
  ],
} as const satisfies Module
