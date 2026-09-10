import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const passiveQueries = {
  id: "01a06187-b3a4-7d21-b96e-890c450998e3",
  pageTypeSlug: "module",
  slug: "passive-queries",
  definition: "what a character's slotted skills and worn armour answer about its passives",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The empty slot sentinel counts toward no skill line.",
    },
  ],
} as const satisfies Module
