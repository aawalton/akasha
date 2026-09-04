import type { Module } from "@akasha/code-system/module"

export const selectorAddonManager = {
  id: "01a061ef-c8a5-7cfb-8274-8a9896bd3526",
  pageTypeSlug: "module",
  slug: "selector-addon-manager",
  definition: "the game's add-on manager read as a list of add-ons and their on-off state",
  code: "ts",
} as const satisfies Module
