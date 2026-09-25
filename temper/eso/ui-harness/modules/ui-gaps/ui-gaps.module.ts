import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiGaps = {
  id: "01a0da55-bf0b-76b5-92d6-b0ecda0a4928",
  type: "page-type/module",
  slug: "ui-gaps",
  definition: "the gaps between a window's controls that are none of the web's spacing steps",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap is measured between two controls held by one control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control is measured to the nearest control across from it and below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two controls are across from each other where their heights overlap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two controls touching or overlapping have no gap between them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A distance at least the largest step places a column rather than parting two controls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap is judged to the half pixel, so a centred control is not refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden control, one faded to nothing and one with no size are not measured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a template made inside a control is the template's, and is not measured.",
    },
  ],
} as const satisfies Module
