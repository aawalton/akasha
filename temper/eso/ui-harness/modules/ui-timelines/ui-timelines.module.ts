import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiTimelines = {
  id: "01a0d40e-43f3-7357-ba6e-fa8bcbec4c7e",
  type: "page-type/module",
  slug: "ui-timelines",
  definition: "the animation timelines the game's documents declare, each with its animations",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline is read from the game's documents rather than stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline carries the kind of each animation it declares, in the order written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline carries the animations of the timeline it inherits before its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline nested in another is kept apart from that timeline's animations.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No duration, delay or value an animation declares is read.",
    },
  ],
} as const satisfies Module
