import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingChatCapture = {
  id: "01a06128-d5c8-74ad-829d-e287530df9eb",
  type: "page-type/module",
  slug: "housing-chat-capture",
  definition: "reading a visit card out of a chat line another player sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is a visit card only when the line has the agreed key word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which chat channels may have a card is a player setting.",
    },
  ],
} as const satisfies Module
