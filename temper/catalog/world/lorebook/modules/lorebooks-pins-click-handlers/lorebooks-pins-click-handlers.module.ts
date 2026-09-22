import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksPinsClickHandlers = {
  id: "01a0c716-a366-7f35-b557-a5eda1403290",
  type: "page-type/module",
  slug: "lorebooks-pins-click-handlers",
  definition: "the waypoint a click on a lore book pin sets, and which pins offer it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin offers the waypoint only while the click menu setting is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unread book's pin offers the waypoint and a read book's pin does not.",
    },
  ],
} as const satisfies Module
