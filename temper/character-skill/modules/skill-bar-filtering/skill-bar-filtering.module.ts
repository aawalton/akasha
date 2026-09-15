import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillBarFiltering = {
  id: "01a06187-b3a3-78c4-bc72-3cc3411efc24",
  type: "module",
  slug: "skill-bar-filtering",
  definition: "the skills a character may put on one bar, given what it wears and what it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon or armour line offers skills only while that line is available.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The werewolf line offers ultimates alone.",
    },
  ],
} as const satisfies Module
