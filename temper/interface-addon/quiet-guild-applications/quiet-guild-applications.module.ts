import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const quietGuildApplications = {
  id: "01a060f1-6919-74e0-a7e7-ebe863625879",
  type: "module",
  slug: "quiet-guild-applications",
  definition: "the guild application notification the add-on hides",
  code: "ts",
} as const satisfies Module
