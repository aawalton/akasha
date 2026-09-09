import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleContainersStackableBank = {
  id: "01a0728b-10d1-77a7-85d4-209b05b2a2af",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-containers-stackable-bank",
  title: "Bank stackable containers",
  description:
    "Deposits stackable containers (reward coffers, event boxes, etc.) in the bank. Open them later in bulk or save for events.",
  goal: "hoard",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "container-stackable",
  displayOrder: 9,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "containers-stackable-bank",
} as const satisfies TemperInventoryRule
