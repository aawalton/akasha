import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleReconstructedNothing = {
  id: "01a0728b-6d6e-7127-8119-73a98594b44c",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-reconstructed-nothing",
  title: "Protect reconstructed gear",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 24,
  action: "nothing",
  active: true,
  goal: "equip",
  locked: true,
  fromTemplate: "reconstructed-nothing",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
