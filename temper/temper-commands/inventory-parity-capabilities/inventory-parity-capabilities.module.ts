import type { Module } from "@akasha/code-system/module"

export const inventoryParityCapabilities = {
  id: "01a068f6-dee0-7b32-a3c0-c5218ac18963",
  pageTypeSlug: "module",
  slug: "inventory-parity-capabilities",
  definition: "what comparing the addon's routing against the web's is built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts a parity run needs are handed over together rather than one by one.",
    },
    {
      invariantKind: "departure",
      statement: "A trace and a route are defined here for the run to read a trace and a route by.",
    },
    {
      invariantKind: "absence",
      statement: "No routing is compared here.",
    },
  ],
} as const satisfies Module
