import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownHeaderRefresh = {
  id: "01a06275-c448-7d4f-b5d1-337777f5d2dd",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-header-refresh",
  definition: "the refresh that reads options onto each header child and re-runs the anchors",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The header is hidden and zeroed before any child is processed.",
    },
    {
      invariantKind: "departure",
      statement: "A collapsed header shows its toggle icon and toggle title alone.",
    },
    {
      invariantKind: "departure",
      statement: "Option values may be plain values or functions returning a value.",
    },
    {
      invariantKind: "constraint",
      statement: "A custom header control is accepted only as game userdata.",
    },
  ],
} as const satisfies Module
