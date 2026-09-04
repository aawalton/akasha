import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingAffixScripts = {
  id: "01a060db-b2ba-73c7-8faa-80842e2c1379",
  pageTypeSlug: "module",
  slug: "scribing-affix-scripts",
  definition: "the tertiary scribing scripts, each putting a buff or a debuff on a grimoire",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A affix script's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A affix script moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
