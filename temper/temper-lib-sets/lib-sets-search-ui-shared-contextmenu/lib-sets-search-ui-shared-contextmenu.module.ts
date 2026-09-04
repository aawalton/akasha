import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedContextmenu = {
  id: "01a0623e-53a0-784d-a83c-91ac526137c8",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-contextmenu",
  definition: "the scrollable menus the search window opens away from its result rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These menus open only when LibScrollableMenu is present.",
    },
  ],
} as const satisfies Module
