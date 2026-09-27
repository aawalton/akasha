import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterRoles = {
  id: "01a060ea-ac5f-7d16-af64-7fbc832ae916",
  type: "page-type/module",
  slug: "character-roles",
  definition: "the playstyles a build is planned for, from DPS through to solo",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The roles are read from the character role pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role's place among the roles is its page's display order.",
    },
  ],
} as const satisfies Module
