import type { Module } from "@akasha/code-system/module"

export const tradingBrowseWindowRows = {
  id: "01a06160-2a59-7146-848b-f736c7465e2d",
  pageTypeSlug: "module",
  slug: "trading-browse-window-rows",
  definition: "the controls one row of the browse window is drawn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Row heights and widths are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
