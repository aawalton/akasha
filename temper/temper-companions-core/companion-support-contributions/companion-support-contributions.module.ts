import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSupportContributions = {
  id: "01a06152-c2d7-7218-a6b1-632b35f18a49",
  pageTypeSlug: "module",
  slug: "companion-support-contributions",
  definition: "support damage and toughness contributions derived from ally-visible buff uptimes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The damage contribution divides remaining armor by a literal fifty thousand.",
    },
    {
      invariantKind: "constraint",
      statement: "Only buffs aimed at an ally-visible target enter the uptime list.",
    },
    {
      invariantKind: "constraint",
      statement: "A debuff counts only when the effect targets an enemy.",
    },
  ],
} as const satisfies Module
