import type { Module } from "@akasha/code-system/module"

export const inventoryOpenCooldownProtection = {
  id: "01a06258-b52e-754e-a4cf-62565f88dff8",
  pageTypeSlug: "module",
  slug: "inventory-open-cooldown-protection",
  definition: "holding a container closed while its cooldown group is still running",
  code: "ts",
} as const satisfies Module
