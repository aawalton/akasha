import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointGeneralSources = {
  id: "01a06108-2ff7-74c2-9e75-d57f7bb7c8a8",
  pageTypeSlug: "module",
  slug: "skill-point-general-sources",
  definition: "the skill points a character earns outside any one zone, and how many each gives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-point pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A source is named by the key the completion record counts that source under.",
    },
  ],
} as const satisfies Module
