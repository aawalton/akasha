import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const nextBossColors = {
  id: "01a06157-8356-75cc-9595-1f512369c1c6",
  type: "module",
  slug: "next-boss-colors",
  definition: "the color marks a district's timer is written in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A district still on its timer is red and a district that is up is green.",
    },
  ],
} as const satisfies Module
