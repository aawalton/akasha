import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowPopover = {
  id: "01a0d9c7-1cd7-71d6-8dd6-9363e9e027fa",
  type: "page-type/module",
  slug: "window-popover",
  definition: "the tooltip Temper shows over one of its own windows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip over a Temper window is the web's popover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover sits on the third surface level, padded 12 on every side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line plays a text part, and a line naming no part is body text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover is as wide as its widest line, and wraps a line past 264.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover is its own window, so the game's own tooltips keep their look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover sits against the side of its owner opposite the point it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The popover is the same size by gamepad as by keyboard, as the web has one scale.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The popover's corners are square until Temper ships a rounded edge.",
    },
  ],
} as const satisfies Module
