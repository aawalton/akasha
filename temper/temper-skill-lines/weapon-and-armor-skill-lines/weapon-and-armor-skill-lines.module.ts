import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponAndArmorSkillLines = {
  id: "01a0608a-c136-70fa-be11-d3265e130947",
  pageTypeSlug: "module",
  slug: "weapon-and-armor-skill-lines",
  definition: "the six weapon skill lines and the three armor skill lines",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
