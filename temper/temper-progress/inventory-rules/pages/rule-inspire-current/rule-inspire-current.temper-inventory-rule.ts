import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleInspireCurrent = {
  id: "01a0728b-4fbc-7ce7-9c17-ef3af0f7a966",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-inspire-current",
  title: "Deconstruct for inspiration",
  description:
    "Routes equipment for deconstruction to the highest-priority character who hasn't fully leveled the corresponding crafting skill. If the current character benefits, the item is deconstructed locally; otherwise it's routed via the bank.",
  goal: "progress",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 44,
  action: "deconstruct",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "inspire-current",
} as const satisfies TemperInventoryRule
