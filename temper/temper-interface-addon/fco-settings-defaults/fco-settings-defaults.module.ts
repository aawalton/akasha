import type { Module } from "@akasha/code-system/module"

export const fcoSettingsDefaults = {
  id: "01a06115-1ad4-7c87-8227-90cbd0e07c05",
  pageTypeSlug: "module",
  slug: "fco-settings-defaults",
  definition: "every interface tweak setting, with the value it starts at",
  code: "ts",
} as const satisfies Module
