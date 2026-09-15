import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownHeaderRefresh = {
  id: "01a06275-c448-7d4f-b5d1-337777f5d2dd",
  type: "module",
  slug: "scrollable-menu-dropdown-header-refresh",
  definition: "the refresh that reads options onto each header child and re-runs the anchors",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The header is hidden and zeroed before any child is processed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collapsed header shows its toggle icon and toggle title alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Option values may be plain values or functions returning a value.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A custom header control is accepted only as game userdata.",
    },
  ],
} as const satisfies Module
