import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tooltipLines = {
  id: "01a0d9be-4e72-798a-9bd8-c5e726850ce3",
  type: "page-type/module",
  slug: "tooltip-lines",
  definition: "the lines Temper writes into the game's item tooltips, by keyboard and gamepad",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line Temper adds to an item tooltip is written through here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The keyboard and gamepad tooltips of one item carry the same lines, in the same order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line keeps its category color in both modes, set inline in its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keyboard line is centered below the game's own lines, in the game's font.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gamepad line sits in a body section of its own, in the game's body style.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are written in the order their writers were added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gamepad item laid out from a bag is written once, after the game's own lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gamepad's left and right tooltips both take the lines.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A gamepad tooltip is a control carrying the game's tooltip methods, not a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Temper window showing the same lines outside a tooltip marks them the same way.",
    },
  ],
} as const satisfies Module
