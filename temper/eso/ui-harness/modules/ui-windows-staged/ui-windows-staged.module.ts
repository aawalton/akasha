import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiWindowsStaged = {
  id: "01a0da1b-25db-7a8f-9699-5fcdea9b3430",
  type: "page-type/module",
  slug: "ui-windows-staged",
  definition: "the windows of Temper's that come up only in a moment the harness stages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window here comes up by the game's answers being replaced for that moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer the player's capture holds is used rather than one made up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text a window shows only of a quest or a set is made up where no capture has it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The crafting panel's research is made up and set before the addon builds it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The capture holds no icon for Power Lash, so the prompt shows Flame Lash's.",
    },
  ],
} as const satisfies Module
