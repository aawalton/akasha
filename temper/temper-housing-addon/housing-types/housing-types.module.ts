import type { Module } from "@akasha/code-system/module"

export const housingTypes = {
  id: "01a06113-b7d3-78a4-80ec-95d612619454",
  pageTypeSlug: "module",
  slug: "housing-types",
  definition: "the shapes a saved favourite, visit card, library entry and bought house take",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
