import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksPublicApi = {
  id: "01a06194-be46-7682-a68a-15c28daea992",
  pageTypeSlug: "module",
  slug: "lorebooks-public-api",
  definition: "the lore book readers this add-on publishes for other add-ons",
  code: "ts",
} as const satisfies Module
