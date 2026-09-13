import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const skillPointFinderColors = {
  id: "01a060ec-5834-7ce4-b990-b2f1dfab5f22",
  type: "module",
  slug: "skill-point-finder-colors",
  definition: "text colored by whether what that text names is done",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color is written into the text as an inline markup tag.",
    },
  ],
} as const satisfies Module
