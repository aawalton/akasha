import type { Module } from "@akasha/code-system/module"

export const libSetsKbfDropFilters = {
  id: "01a0623e-53a1-7e95-9628-40837ad8c6e6",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-drop-filters",
  definition: "the dropdowns naming where a set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A zone id of zero or less names a special zone rather than a game zone.",
    },
  ],
} as const satisfies Module
