import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingFocusScripts = {
  id: "01a060db-b2bb-7166-ba4a-b183afce5394",
  pageTypeSlug: "module",
  slug: "scribing-focus-scripts",
  definition: "the primary scribing scripts, each saying what a grimoire does",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A focus script's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A focus script moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
