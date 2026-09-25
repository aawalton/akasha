import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationSettingsShape = {
  id: "01a06038-b7a4-79d6-aa24-39870ef827c8",
  type: "page-type/module",
  slug: "automation-settings-shape",
  definition: "what unknown JSON holds to be taken as automation settings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings arrive as JSON nobody has vouched for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle with anything other than a boolean is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no toggle name has is carried through untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings written by a newer temper are still read by an older temper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map for characters and a map for companions are both required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global scope is left out rather than written empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The toggle fields are built from the toggle name lists.",
    },
  ],
} as const satisfies Module
