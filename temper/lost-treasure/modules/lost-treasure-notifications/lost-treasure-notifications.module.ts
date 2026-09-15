import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lostTreasureNotifications = {
  id: "01a06141-8008-77a8-af65-98ebdb893c22",
  type: "page-type/module",
  slug: "lost-treasure-notifications",
  definition: "an offer to report a new dig site, shown in the notification list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notification is offered in three languages alone.",
    },
  ],
} as const satisfies Module
