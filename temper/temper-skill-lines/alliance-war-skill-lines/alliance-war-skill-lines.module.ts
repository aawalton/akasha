import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const allianceWarSkillLines = {
  id: "01a0608a-c133-71ab-bf75-2e25200d8aeb",
  pageTypeSlug: "module",
  slug: "alliance-war-skill-lines",
  definition: "the assault, emperor and support skill lines the alliance war grants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
