import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillLineQueries = {
  id: "01a06152-c2d2-725e-9e7f-499e3e6fc2f0",
  pageTypeSlug: "module",
  slug: "companion-skill-line-queries",
  definition: "the companion skill lines a companion's equipped gear opens up",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One-handed weapons pick their skill line from what sits in the off hand.",
    },
    {
      invariantKind: "constraint",
      statement: "Class and guild skill lines are available without regard to gear.",
    },
    {
      invariantKind: "constraint",
      statement: "An armor skill line opens at five pieces of that weight.",
    },
  ],
} as const satisfies Module
