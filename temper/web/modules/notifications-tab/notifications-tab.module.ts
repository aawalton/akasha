import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationsTab = {
  id: "01a06432-b190-74d1-baf2-ed7d76418c85",
  type: "page-type/module",
  slug: "notifications-tab",
  definition: "the notifications tab of settings, where reports and tracing are set",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The actions to confirm are named from their item action and buy action pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
