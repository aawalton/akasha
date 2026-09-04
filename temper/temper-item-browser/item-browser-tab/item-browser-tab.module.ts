import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserTab = {
  id: "01a06178-3722-7cb3-93b8-f06e95d36151",
  pageTypeSlug: "module",
  slug: "item-browser-tab",
  definition:
    "the add-on's own tab in the journal, and what it rebuilds when the collection changes",
  code: "ts",
} as const satisfies Module
