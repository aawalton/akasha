import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDebugIndex = {
  id: "01a06275-c447-7da5-abe9-590fd4049dbb",
  type: "module",
  slug: "scrollable-menu-debug-index",
  definition: "the bare import list covering the logger and its slash-command toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The logger is imported before the toggle that switches the logger.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
