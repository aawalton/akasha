import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoSettingsEmpty = {
  id: "01a06115-1ad4-71db-8a0d-6110abd23801",
  pageTypeSlug: "module",
  type: "module",
  slug: "fco-settings-empty",
  definition: "an interface tweak setting table with nothing yet",
  code: "ts",
} as const satisfies Module
