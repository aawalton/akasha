import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillTooltip = {
  id: "01a06152-c2d4-7d27-895d-d2dfe67c393f",
  pageTypeSlug: "module",
  slug: "companion-skill-tooltip",
  definition: "a companion skill description with its durations and values filled in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nested synergy or delayed effect contributes its own value slot.",
    },
    {
      invariantKind: "constraint",
      statement: "Formula effects are collected in the order the skill declares.",
    },
    {
      invariantKind: "gap",
      statement: "The primary targeting is the first effect carrying a target.",
    },
  ],
} as const satisfies Module
