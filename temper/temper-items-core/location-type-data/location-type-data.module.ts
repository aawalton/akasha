import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const locationTypeData = {
  id: "01a060d9-4989-7621-819f-d8c567133ec6",
  pageTypeSlug: "module",
  slug: "location-type-data",
  definition: "the kinds of place an inventory reading holds items in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table was written out from the location type pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "The order of this table is the order a reading shows locations in.",
    },
    {
      invariantKind: "gap",
      statement: "A location type moved to another place reorders every inventory shown.",
    },
  ],
} as const satisfies Module
