import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleMasterWritsBank = {
  id: "01a0728b-4fbd-7216-a904-e163cc67b526",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-master-writs-bank",
  title: "Bank master writs",
  description:
    "Stashes master writs in the bank. Master writs reward writ vouchers for high-end crafting station furnishings.",
  goal: "task",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "master-writs",
  displayOrder: 47,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "master-writs-bank",
} as const satisfies TemperInventoryRule
