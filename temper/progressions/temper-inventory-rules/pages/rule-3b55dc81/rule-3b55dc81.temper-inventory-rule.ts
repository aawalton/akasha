import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const rule3b55dc81 = {
  id: "01a0728a-d6fe-7dbb-9828-69865270334a",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-3b55dc81",
  description:
    "Destroys known containers (reward already owned) with guild-store value < 5000g. Raised from 1000 to match the uniform 5000g line.",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "containers",
  displayOrder: 10,
  action: "destroy",
  active: true,
  updatedAt: "2026-06-02T20:49:28.407Z",
  locked: true,
} as const satisfies TemperInventoryRule
