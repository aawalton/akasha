import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiListClass = {
  id: "01a0623e-53a0-731f-9970-2086175cd397",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-list-class",
  definition: "the class the result list objects are made from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The class is placed on the game global LibSets_SearchUI_List by assignment.",
    },
  ],
} as const satisfies Module
