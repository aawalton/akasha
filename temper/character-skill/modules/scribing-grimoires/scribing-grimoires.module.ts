import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingGrimoires = {
  id: "01a0617c-86c1-7ff1-9fbb-5185c2f3eb4d",
  type: "module",
  slug: "scribing-grimoires",
  definition: "every scribing grimoire an Elder Scrolls Online character may learn",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An entry's place in this table is the index a build hash has.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An entry moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This table is divided across runs.",
    },
  ],
} as const satisfies Module
