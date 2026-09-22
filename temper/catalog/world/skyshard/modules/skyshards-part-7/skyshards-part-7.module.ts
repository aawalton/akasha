import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPart7 = {
  id: "01a061a8-9c69-75a2-b7b3-9f86f9d709aa",
  type: "page-type/module",
  slug: "skyshards-part-7",
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
