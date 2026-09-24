import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkillsFromPages = {
  id: "01a06187-b3a0-7150-bb13-34820d779cb1",
  type: "page-type/module",
  slug: "character-skills-from-pages",
  definition: "every Elder Scrolls Online skill the catalog pages have",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An entry's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is divided across runs.",
    },
  ],
} as const satisfies Module
