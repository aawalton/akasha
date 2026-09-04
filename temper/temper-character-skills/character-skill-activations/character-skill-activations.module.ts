import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkillActivations = {
  id: "01a06187-b3a2-71d7-8a99-86c4051cb91c",
  pageTypeSlug: "module",
  slug: "character-skill-activations",
  definition: "the tooltip wording and formula effects a character skill activation carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "An activation carries the key the matching skill row carries.",
    },
  ],
} as const satisfies Module
