import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingGrimoires = {
  id: "01a0617c-86c1-7ff1-9fbb-5185c2f3eb4d",
  pageTypeSlug: "module",
  slug: "scribing-grimoires",
  definition: "every scribing grimoire an Elder Scrolls Online character may learn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "An entry's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "departure",
      statement: "This table is divided across runs.",
    },
    {
      invariantKind: "constraint",
      statement: "No akasha file passes fifteen thousand bytes.",
    },
  ],
} as const satisfies Module
