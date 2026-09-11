import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const lorebooksEvents = {
  id: "01a06194-be40-7a67-9b0e-e344eb3c3ea7",
  type: "module",
  slug: "lorebooks-events",
  definition: "what the add-on does when the game says a book was opened, closed or learned",
  code: "ts",
} as const satisfies Module
