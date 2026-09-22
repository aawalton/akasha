import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPart15 = {
  id: "01a061a8-9c67-71f9-8ce5-77422a3ffcdb",
  type: "page-type/module",
  slug: "skyshards-part-15",
  definition: "a run of the skyshard placement table, in the order the whole table names its maps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
