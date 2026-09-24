import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingGrimoires02 = {
  id: "01a0617c-86c0-70e5-8460-db175c793bbd",
  type: "page-type/module",
  slug: "scribing-grimoires-02",
  definition: "a set of scribing grimoires, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
