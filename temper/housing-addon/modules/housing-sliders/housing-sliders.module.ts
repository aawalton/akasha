import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingSliders = {
  id: "01a06128-d5d3-7266-b58c-be10d8a99596",
  type: "page-type/module",
  slug: "housing-sliders",
  definition: "scrolling a housing list by its slider and by the mouse wheel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list shorter than the frame with the list hides the slider.",
    },
  ],
} as const satisfies Module
