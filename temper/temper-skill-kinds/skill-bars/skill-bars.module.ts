import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillBars = {
  id: "01a060db-b2bc-7125-b53b-c0f90c47961f",
  pageTypeSlug: "module",
  slug: "skill-bars",
  definition: "the primary skill bar and the backup skill bar a character swaps between",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
