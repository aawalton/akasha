import type { Module } from "@akasha/code-system/module"

export const quietGuildMotd = {
  id: "01a060f1-691b-7c77-bc50-53832d7e309a",
  pageTypeSlug: "module",
  slug: "quiet-guild-motd",
  definition: "the guild message of the day the add-on hides",
  code: "ts",
} as const satisfies Module
