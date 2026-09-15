import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetSlider = {
  id: "01a06100-0000-7000-8000-000000000026",
  type: "page-type/module",
  slug: "addon-menu-widget-slider",
  definition: "the numeric slider with an editable value box beside or below it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Typed input is clamped into range unless clampInput is false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mouse wheel changes the value only while the slider or its box has focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dragging commits the value on release rather than on every step.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Decimal rounding happens before clamping.",
    },
  ],
} as const satisfies Module
