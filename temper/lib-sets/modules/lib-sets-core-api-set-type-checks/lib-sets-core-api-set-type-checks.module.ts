import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsCoreApiSetTypeChecks = {
  id: "01a06231-8f1b-7ef7-8811-423001ce29a7",
  type: "page-type/module",
  slug: "lib-sets-core-api-set-type-checks",
  definition: "whether a set has pieces of a given armor, weapon or equip type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A type the library has no table for answers nothing rather than false.",
    },
  ],
} as const satisfies Module
