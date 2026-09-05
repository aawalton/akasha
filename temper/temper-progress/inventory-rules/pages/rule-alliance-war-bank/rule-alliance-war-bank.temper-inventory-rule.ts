import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleAllianceWarBank = {
  id: "01a0728b-10d0-7dba-bd15-daddc405eed9",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-alliance-war-bank",
  title: "Bank Alliance War items",
  description:
    "Deposits Alliance War items (siege equipment, forward camps, repair kits, etc.) in the bank for safekeeping.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "alliance-war",
  displayOrder: 63,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  goal: "hoard",
  locked: true,
  fromTemplate: "alliance-war-bank",
  destination: "bank",
} as const satisfies TemperInventoryRule
