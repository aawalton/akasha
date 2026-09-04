import type { Module } from "@akasha/code-system/module"

export const tradingBrowseWindow = {
  id: "01a06160-2a59-7df3-a77c-588f057cc94c",
  pageTypeSlug: "module",
  slug: "trading-browse-window",
  definition: "the window a player browses guild store results in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window is built once and refilled rather than rebuilt per search.",
    },
  ],
} as const satisfies Module
