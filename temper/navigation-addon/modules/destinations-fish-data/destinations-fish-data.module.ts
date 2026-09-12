import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationsFishData = {
  id: "01a06269-29b8-742e-b12a-ee2144c30257",
  type: "module",
  slug: "destinations-fish-data",
  definition: "the fishing achievement rows by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
