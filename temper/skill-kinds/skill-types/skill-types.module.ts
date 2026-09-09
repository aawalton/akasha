import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillTypes = {
  id: "01a060db-b2bd-709e-998c-884a585cd251",
  pageTypeSlug: "module",
  slug: "skill-types",
  definition: "the three kinds a skill ability is, active or ultimate or passive",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
