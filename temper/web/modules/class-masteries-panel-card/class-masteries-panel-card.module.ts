import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classMasteriesPanelCard = {
  id: "01a15ece-9d47-75e8-bbfa-b303896bf627",
  type: "page-type/module",
  slug: "class-masteries-panel-card",
  definition: "a panel card with the class masteries a build chooses",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each chosen class mastery shows its name, its class and its description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build choosing no class mastery shows no card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the class pages.",
    },
  ],
  createdAt: "2026-10-21T14:12:41.414Z",
  updatedAt: "2026-10-21T14:12:41.414Z",
} as const satisfies Module
