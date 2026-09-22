import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const unlockByPriority = {
  id: "019e3104-2610-72db-8869-9f0539544306",
  type: "page-type/temper-rule-template",
  slug: "unlock-by-priority",
  title: "Use unlockables",
  key: "unlock-by-priority",
  description:
    "Uses items that teach something new — motifs, recipes, style pages, furnishing plans, etc. If the current character can learn the item, it's used immediately. For recipes (character-specific knowledge), the addon checks the current character only (ESO API limitation).",
  categoryId: "temper-item-category-tree/knowledge",
  displayOrder: 11,
  action: "temper-item-action/use",
  active: false,
  goal: "temper-rule-goal/unlock",
  destination: "character:by-priority",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
