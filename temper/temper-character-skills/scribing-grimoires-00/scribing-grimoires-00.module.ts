import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingGrimoires00 = {
  id: "01a0617c-86be-7475-9eaf-9d0d5e58605d",
  pageTypeSlug: "module",
  slug: "scribing-grimoires-00",
  definition: "one run of scribing grimoires, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
