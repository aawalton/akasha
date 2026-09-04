import type { Module } from "@akasha/code-system/module"

export const customMenuLib = {
  id: "01a0605a-581e-7826-9cc9-769dd4862bdf",
  pageTypeSlug: "module",
  slug: "custom-menu-lib",
  definition: "the library object every caller of the custom menu reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A registered category outside the early to late range is clamped into it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A special key context menu is registered under its own key rather than a category.",
    },
  ],
} as const satisfies Module
