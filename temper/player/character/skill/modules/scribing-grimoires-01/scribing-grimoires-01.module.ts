import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingGrimoires01 = {
  id: "01a0617c-86bf-7a17-8a83-7afe53632f1a",
  type: "page-type/module",
  slug: "scribing-grimoires-01",
  definition: "a run of scribing grimoires, in the order the whole table names them",
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
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
