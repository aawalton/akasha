import type { Module } from "@akasha/code-system/module"

export const libSetsKbfLsmOptions = {
  id: "01a0623e-53a1-71f3-a8c2-70d8d97f411d",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-lsm-options",
  definition: "the default options a scrollable-menu dropdown is built with",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "Fifteen rows of a dropdown are visible at once." },
  ],
} as const satisfies Module
