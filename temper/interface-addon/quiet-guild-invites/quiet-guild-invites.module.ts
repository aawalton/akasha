import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const quietGuildInvites = {
  id: "01a060f1-691a-7043-ac48-0be3c3cbc7cf",
  pageTypeSlug: "module",
  type: "module",
  slug: "quiet-guild-invites",
  definition: "the guild invitation notifications the add-on hides",
  code: "ts",
} as const satisfies Module
