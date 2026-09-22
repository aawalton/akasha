import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingGrimoires03 = {
  id: "01a0617c-86c0-7b93-b2bb-ff577dbfd3a0",
  type: "page-type/module",
  slug: "scribing-grimoires-03",
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
