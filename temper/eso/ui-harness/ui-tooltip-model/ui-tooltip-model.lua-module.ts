import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiTooltipModel = {
  id: "01a0d636-e8b6-7723-9385-0733baa44008",
  type: "page-type/lua-module",
  slug: "ui-tooltip-model",
  definition: "the lines a tooltip the sandbox holds is given",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line added to a tooltip is a label under the lines added before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip is as tall as its lines and the padding between them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line naming no font is set in the game's plain font, centered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing a tooltip takes its lines away.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "What the engine itself writes into a tooltip is written by no Lua, so is not here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's tooltip templates give their padding as ResizeToFitPadding, not insets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip's lines sit inside the padding the tooltip's template gives them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip is taller than its lines by the height of its padding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tooltip stating no width grows to its widest line and its padding, as the game's tooltips do.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's tooltip templates hold that growth to a greatest width, and some to a least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip held narrower than its lines wraps them at the width left inside it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A line's height is taken as it is added, so a wider line added after leaves it as it was.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The padding is split evenly between opposite sides, which no capture of the game has confirmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is loaded after the control methods, whose labels its lines are.",
    },
  ],
} as const satisfies LuaModule
