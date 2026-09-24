import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills = {
  id: "01a06187-b3a1-7211-9955-637919a983d5",
  type: "page-type/module",
  slug: "character-skills",
  definition: "every skill a character may slot, the scribed ones among them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Scribed skills follow the catalog skills rather than sorting among the catalog skills.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement: "A skill moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["SKILLS_DATA"],
} as const satisfies Module
