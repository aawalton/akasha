import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderState = {
  id: "01a060ec-5845-7183-82f7-c87b4acc65bd",
  type: "page-type/module",
  slug: "skill-point-finder-state",
  definition: "what the skill point window has between one redraw and the next",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asks for state and is refused while the window is unopened.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.965Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
