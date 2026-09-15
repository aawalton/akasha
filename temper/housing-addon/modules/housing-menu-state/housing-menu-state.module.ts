import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingMenuState = {
  id: "01a06113-b7d1-7b8c-b88f-ba1df4ff6bdf",
  type: "page-type/module",
  slug: "housing-menu-state",
  definition: "the settings-panel holder the port-to-friend part registers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel is described before the settings library is there to read the panel.",
    },
  ],
} as const satisfies Module
