import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiListBuild = {
  id: "01a0623e-53a0-7c7c-944a-09cd92bf699b",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-list-build",
  definition: "the row each set becomes in the result list",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "At most five drop locations are shown in one row." },
    {
      invariantKind: "departure",
      statement: "The setting can append a set's English name to the set's own name.",
    },
  ],
} as const satisfies Module
