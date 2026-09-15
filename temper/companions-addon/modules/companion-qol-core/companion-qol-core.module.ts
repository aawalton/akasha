import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolCore = {
  id: "01a0611d-84c6-7ad9-9eb6-645084830a14",
  type: "page-type/module",
  slug: "companion-qol-core",
  definition: "summoning and dismissing the active companion",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which companion was dismissed is remembered so the same companion comes back.",
    },
  ],
} as const satisfies Module
