import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts4 = {
  id: "01a06275-c444-73ec-bebb-809fa9799246",
  type: "module",
  slug: "scrollable-menu-casts-4",
  definition:
    "the narrowing helpers for shapes named from ThisVoidRecordStringUnknown through ZoEntryData",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The tail of the file has plain one-word narrowings such as asString and asNumber.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
