import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterRoles = {
  id: "01a060ea-ac5f-7d16-af64-7fbc832ae916",
  pageTypeSlug: "module",
  slug: "character-roles",
  definition: "the playstyles a build is planned for, from DPS through to solo",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
  ],
} as const satisfies Module
