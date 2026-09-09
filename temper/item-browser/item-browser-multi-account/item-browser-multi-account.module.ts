import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserMultiAccount = {
  id: "01a06178-3720-7c0a-bb56-fe4d999bb279",
  pageTypeSlug: "module",
  slug: "item-browser-multi-account",
  definition:
    "the same collection read for another account or another server, where that library is present",
  code: "ts",
} as const satisfies Module
