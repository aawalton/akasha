import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetHeader = {
  id: "01a06100-0000-7000-8000-000000000022",
  type: "module",
  slug: "addon-menu-widget-header",
  definition: "the section title with a rule above it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The header has a fixed height of thirty pixels.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No value is read or written by the header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A help URL anchors its icon at the right edge of the title.",
    },
  ],
} as const satisfies Module
