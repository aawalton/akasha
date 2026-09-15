import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiListBuild = {
  id: "01a0623e-53a0-7c7c-944a-09cd92bf699b",
  type: "module",
  slug: "lib-sets-search-ui-list-build",
  definition: "the row each set becomes in the result list",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "At most five drop locations are shown in one row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The setting can append a set's English name to the set's own name.",
    },
  ],
} as const satisfies Module
