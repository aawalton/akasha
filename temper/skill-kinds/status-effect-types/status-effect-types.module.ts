import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const statusEffectTypes = {
  id: "01a060db-b2be-7c53-bc5c-ef2d9e30a4ae",
  type: "module",
  slug: "status-effect-types",
  definition: "the twelve status effects a skill puts on what it hits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
