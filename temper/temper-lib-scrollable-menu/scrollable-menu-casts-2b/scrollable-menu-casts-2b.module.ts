import type { Module } from "@akasha/code-system/module"

export const scrollableMenuCasts2b = {
  id: "01a06275-c444-72c1-8bcb-bfc79bd98563",
  pageTypeSlug: "module",
  slug: "scrollable-menu-casts-2b",
  definition: "the narrowing helpers for shapes named from Narrate through ResetFilters",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "departure",
      statement: "Plain container types such as Record and array shapes dominate this half.",
    },
    {
      invariantKind: "constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
