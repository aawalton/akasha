import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const itemBrowserSettings = {
  id: "01a06178-3721-7250-be23-fc9a1c3352de",
  pageTypeSlug: "module",
  type: "module",
  slug: "item-browser-settings",
  definition: "the add-on's own panel in the game's settings menu",
  code: "ts",
} as const satisfies Module
