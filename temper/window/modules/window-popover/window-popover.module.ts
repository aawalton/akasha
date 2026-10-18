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
      statement: "A tooltip over a Temper window looks as the game's own tooltip does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover takes the game's default backdrop, padded 16 on every side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line plays a text part, and a line naming no part is body text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line takes a color of its own only where the color names a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover is as wide as its widest line, and wraps a line past 318.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover is its own window, so the game's own tooltips keep their look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover sits above every window, a menu it names a choice of included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The popover sits against the side of its owner opposite the point it names.",
    },
  ],
  createdAt: "2026-09-25T18:15:00.055Z",
  updatedAt: "2026-10-18T17:36:08.028Z",
} as const satisfies Module
