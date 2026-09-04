import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderState = {
  id: "01a060ec-5845-7183-82f7-c87b4acc65bd",
  pageTypeSlug: "module",
  slug: "skill-point-finder-state",
  definition: "what the skill point window holds between one redraw and the next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader asks for state and is refused while the window is unopened.",
    },
  ],
} as const satisfies Module
