import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDropNameNamesFr = {
  id: "01a061d6-3e28-728d-b0db-98bd68c7fcb6",
  type: "page-type/module",
  slug: "lib-sets-drop-name-names-fr",
  definition: "the French name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
