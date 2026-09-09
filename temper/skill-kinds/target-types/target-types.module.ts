import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const targetTypes = {
  id: "01a060db-b2bf-7d23-9d53-a943f51ee61c",
  pageTypeSlug: "module",
  slug: "target-types",
  definition: "who a skill effect reaches, from the caster alone to the ground under it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
