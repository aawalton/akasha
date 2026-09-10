import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleUnlockStolen = {
  id: "01a0728b-8ec2-7808-9e1b-362739c2b586",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-unlock-stolen",
  title: "Launder stolen unlockables",
  description:
    "Launders stolen items that can teach something (motifs, recipes, etc.) so they can be used. Place before other unlock rules.",
  goal: "unlock",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "knowledge",
  displayOrder: 26,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "unlock-stolen",
} as const satisfies TemperInventoryRule
