import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilIndex = {
  id: "01a06275-c449-7f7a-ba6b-ccd20e2d132b",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-index",
  definition: "the bare import list covering the eight util modules",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      invariantKind: "constraint",
      statement: "The data helpers are imported before the modules that read a helper.",
    },
    {
      invariantKind: "absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
