import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedUi = {
  id: "01a0623c-2df8-7100-80db-d50fc719e34f",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-ui",
  definition: "what any search window does when it is shown, hidden or reset",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Showing the window announces itself through a named callback.",
    },
  ],
} as const satisfies Module
