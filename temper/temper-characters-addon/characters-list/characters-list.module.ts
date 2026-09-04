import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersList = {
  id: "01a062e9-b6fe-7013-833f-343c17ac3dec",
  pageTypeSlug: "module",
  slug: "characters-list",
  definition: "every character on the account, read into the saved table",
  code: "ts",
} as const satisfies Module
