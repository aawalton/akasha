import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingSignatureScripts = {
  id: "01a060db-b2bb-78c2-a678-b0ddc7114f93",
  pageTypeSlug: "module",
  slug: "scribing-signature-scripts",
  definition: "the secondary scribing scripts, each shaping how a grimoire is cast",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A signature script's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A signature script moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
