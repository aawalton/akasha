import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pinFilters = {
  id: "01a06062-57e0-7e1a-b3d7-a8820fb90bc1",
  type: "module",
  slug: "pin-filters",
  definition: "the checkbox a pin type gets on each map filter panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pin type already carrying a filter gets no second filter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Separate saved keys are minted per map group only where asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggled checkbox writes the compass pin type's saved key as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hidden filter checkbox is pulled up by its own height.",
    },
  ],
} as const satisfies Module
