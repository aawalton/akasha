import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleReconstructedNothing = {
  id: "01a0728b-6d6e-7127-8119-73a98594b44c",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-reconstructed-nothing",
  title: "Protect reconstructed gear",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  goal: "equip",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 24,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "reconstructed-nothing",
} as const satisfies TemperInventoryRule
