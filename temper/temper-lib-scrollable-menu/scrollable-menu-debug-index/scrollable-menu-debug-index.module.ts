import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDebugIndex = {
  id: "01a06275-c447-7da5-abe9-590fd4049dbb",
  pageTypeSlug: "module",
  slug: "scrollable-menu-debug-index",
  definition: "the bare import list covering the logger and its slash-command toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      invariantKind: "constraint",
      statement: "The logger is imported before the toggle that switches the logger.",
    },
    {
      invariantKind: "absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
