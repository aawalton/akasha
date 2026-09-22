import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParityCapabilities = {
  id: "01a068f6-dee0-7b32-a3c0-c5218ac18963",
  type: "page-type/module",
  slug: "inventory-parity-capabilities",
  definition: "what builds a comparison of the addon's routing against the web's",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts a parity run needs are handed over together rather than one by one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace and a route are defined here for the run to read a trace and a route by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No routing is compared here.",
    },
  ],
} as const satisfies Module
