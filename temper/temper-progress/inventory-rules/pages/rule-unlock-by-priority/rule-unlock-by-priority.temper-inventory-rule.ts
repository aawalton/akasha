import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleUnlockByPriority = {
  id: "01a0728b-8ec1-746f-bd66-65142a6da18b",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-unlock-by-priority",
  title: "Use unlockables",
  description:
    "Uses items that teach something new — motifs, recipes, style pages, furnishing plans, etc. If the current character can learn the item, it's used immediately. For recipes (character-specific knowledge), the addon checks the current character only (ESO API limitation).",
  goal: "unlock",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "knowledge",
  displayOrder: 31,
  action: "use",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "unlock-by-priority",
} as const satisfies TemperInventoryRule
