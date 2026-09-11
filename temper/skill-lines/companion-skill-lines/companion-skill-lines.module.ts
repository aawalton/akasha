import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionSkillLines = {
  id: "01a0608a-c134-7baf-b371-fead0aad1a6f",
  pageTypeSlug: "module",
  type: "module",
  slug: "companion-skill-lines",
  definition: "the forty-four skill lines a companion advances",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
