import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentQualities = {
  id: "01a060b8-08c6-7141-8b6e-044cf34927d5",
  type: "module",
  slug: "equipment-qualities",
  definition: "the quality tiers a piece of equipment is made at, from no quality up to mythic",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A quality's place in this table is the index a build hash has.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A quality moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
