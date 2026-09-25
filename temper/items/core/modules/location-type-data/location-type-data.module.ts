import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationTypeData = {
  id: "01a060d9-4989-7621-819f-d8c567133ec6",
  type: "page-type/module",
  slug: "location-type-data",
  definition: "the kinds of place holding an inventory reading's items",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table was written out from the location type pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order of this table is the order a reading shows locations in.",
    },
  ],
} as const satisfies Module
