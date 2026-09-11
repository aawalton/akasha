import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const notificationsTab = {
  id: "01a06432-b190-74d1-baf2-ed7d76418c85",
  pageTypeSlug: "module",
  type: "module",
  slug: "notifications-tab",
  definition: "the notifications tab of settings, where reports and tracing are set",
  code: "tsx",
} as const satisfies Module
