import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentPanel = {
  id: "01a0642d-9a17-7211-b1be-9d0aa3197165",
  type: "page-type/module",
  slug: "equipment-panel",
  definition: "the armor, jewelry and weapon sections of a build's gear, side by side",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each weapon bar is named by the title on that bar's own page.",
    },
  ],
} as const satisfies Module
