import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserWindow = {
  id: "01a06258-b529-74f2-9578-b1ef2c59ab8b",
  type: "page-type/module",
  slug: "inventory-browser-window",
  definition: "the cross-character browser window and the scroll list of rows inside it",
  code: "ts",
} as const satisfies Module
