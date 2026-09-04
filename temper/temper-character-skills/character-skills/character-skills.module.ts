import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills = {
  id: "01a06187-b3a1-7211-9955-637919a983d5",
  pageTypeSlug: "module",
  slug: "character-skills",
  definition: "every skill a character may slot, the scribed ones among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Scribed skills follow the catalog skills rather than sorting among the catalog skills.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A skill moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
