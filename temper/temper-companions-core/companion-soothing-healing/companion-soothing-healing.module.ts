import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSoothingHealing = {
  id: "01a06152-c2d4-7368-9a79-2be1d6ec751f",
  pageTypeSlug: "module",
  slug: "companion-soothing-healing",
  definition: "the healing a companion's soothing-trait gear adds up to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the soothing trait is counted here.",
    },
    {
      invariantKind: "constraint",
      statement: "A two-handed weapon carries a soothing value of its own.",
    },
  ],
} as const satisfies Module
