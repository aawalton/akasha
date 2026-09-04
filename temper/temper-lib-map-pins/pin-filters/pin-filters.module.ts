import type { Module } from "@akasha/code-system/module"

export const pinFilters = {
  id: "01a06062-57e0-7e1a-b3d7-a8820fb90bc1",
  pageTypeSlug: "module",
  slug: "pin-filters",
  definition: "the checkbox a pin type gets on each map filter panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pin type already carrying a filter gets no second filter.",
    },
    {
      invariantKind: "departure",
      statement: "Separate saved keys are minted per map group only where asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A toggled checkbox writes the compass pin type's saved key as well.",
    },
    {
      invariantKind: "departure",
      statement: "A hidden filter checkbox is pulled up by its own height.",
    },
  ],
} as const satisfies Module
