import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const itemBrowserTab = {
  id: "01a06178-3722-7cb3-93b8-f06e95d36151",
  type: "module",
  slug: "item-browser-tab",
  definition:
    "the add-on's own tab in the journal, and what it rebuilds when the collection changes",
  code: "ts",
} as const satisfies Module
