import type { Module } from "@akasha/code-system/module"

export const scrollableMenuApiCore = {
  id: "01a06275-c442-78e9-91db-fd3e3a781bd5",
  pageTypeSlug: "module",
  slug: "scrollable-menu-api-core",
  definition: "the globals that add a scrollable dropdown to a combobox and add one menu entry",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The supplied container must already hold a ZO_ComboBox instance or the call errors.",
    },
    {
      invariantKind: "departure",
      statement: "Entry validation failures are raised as errors rather than returned as a result.",
    },
    {
      invariantKind: "departure",
      statement: "Persistent-menu state is a plain field on the library object.",
    },
    {
      invariantKind: "constraint",
      statement: "A divider entry has its callback discarded.",
    },
  ],
} as const satisfies Module
