import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts3b = {
  id: "01a06275-c444-7786-bf45-b073f4b4af21",
  type: "module",
  slug: "scrollable-menu-casts-3b",
  definition:
    "the narrowing helpers for shapes named from ThisVoidControlUnknownAlt through PreventerVar",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Callback signatures are named after their parameter list rather than their role.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Type names are truncated to a fixed width which forces the digit suffixes.",
    },
  ],
} as const satisfies Module
