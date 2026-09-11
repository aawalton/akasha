import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const itemBrowserState = {
  id: "01a06178-3721-731d-b1fb-863ccc82549b",
  pageTypeSlug: "module",
  type: "module",
  slug: "item-browser-state",
  definition:
    "the player's choices, the shades a row is written in, and the set list, held for the session",
  code: "ts",
} as const satisfies Module
