import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldSkillCatalog = {
  id: "01a0de72-b25f-7e1a-a89a-ce881f70b14a",
  type: "page-type/module",
  slug: "held-skill-catalog",
  definition: "every skill a character may slot, as last read from the skill pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill's place in the catalogue is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Scribed skills follow the catalog skills rather than sorting among them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One catalogue is held at a time, and a new reading replaces it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table read from the catalogue reads whichever catalogue is held when it is read.",
    },
  ],
} as const satisfies Module
