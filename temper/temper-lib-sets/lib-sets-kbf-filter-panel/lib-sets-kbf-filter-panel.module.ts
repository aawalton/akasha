import type { Module } from "@akasha/code-system/module"

export const libSetsKbfFilterPanel = {
  id: "01a0623e-53a1-7dd5-a1ad-b9e1e7101b97",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-filter-panel",
  definition: "the keyboard window's filter row assembled from its eleven dropdown builders",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The search button is turned off before the dropdowns are built.",
    },
  ],
} as const satisfies Module
