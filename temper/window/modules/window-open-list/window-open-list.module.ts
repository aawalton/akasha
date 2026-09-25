import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowOpenList = {
  id: "01a0da80-03f3-7d48-9a91-f98042b44075",
  type: "page-type/module",
  slug: "window-open-list",
  definition: "the list a Temper dropdown or menu shows while it is open",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An open list takes the web's look only while a Temper window opened it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's shared list gets its own look back as it closes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list opened from an entry of a list in the web's look takes that look too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Temper window is one whose name opens with Temper, other than a menu's own list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort header's arrow in a Temper window is lucide's arrow-up or arrow-down.",
    },
  ],
} as const satisfies Module
