import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPart4 = {
  id: "01a061a8-9c68-7ab9-a9df-2e4e77710832",
  type: "page-type/module",
  slug: "skyshards-part-4",
  definition: "a set of the skyshard placement table, in the order the whole table names its maps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This set is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
