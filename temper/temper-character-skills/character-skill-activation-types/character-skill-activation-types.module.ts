import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkillActivationTypes = {
  id: "01a0617a-2c72-70de-be50-92db6d1d5ec0",
  pageTypeSlug: "module",
  slug: "character-skill-activation-types",
  definition: "the shape a skill's tooltip template and its formula effects carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An activation effect states a kind and a formula.",
    },
  ],
} as const satisfies Module
