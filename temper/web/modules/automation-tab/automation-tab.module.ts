import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationTab = {
  id: "01a06432-b190-7270-aa46-13a81135597b",
  type: "page-type/module",
  slug: "automation-tab",
  definition: "the automation tab of settings, where each inventory toggle is set",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A writ craft's toggle is labelled by its craft type page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its other wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
