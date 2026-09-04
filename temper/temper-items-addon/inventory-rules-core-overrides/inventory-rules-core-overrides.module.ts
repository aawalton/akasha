import type { Module } from "@akasha/code-system/module"

export const inventoryRulesCoreOverrides = {
  id: "01a06258-b52f-7a76-8493-ee83f54b074a",
  pageTypeSlug: "module",
  slug: "inventory-rules-core-overrides",
  definition: "whether an item is already known or can be unlocked, so a rule can be overridden",
  code: "ts",
} as const satisfies Module
