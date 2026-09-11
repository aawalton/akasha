import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skillsPanelPoints = {
  id: "01a090b6-8f92-709b-b33e-bb4446b7fe87",
  pageTypeSlug: "module",
  type: "module",
  slug: "skills-panel-points",
  definition: "what an add-on draws beside the skill points the skills panel shows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What an add-on draws is counted afresh before the panel is hooked.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws its own points before what an add-on adds is drawn.",
    },
  ],
} as const satisfies Module
