import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleResearchByPriority = {
  id: "01a0728b-6d6e-7d08-943c-060decea6265",
  type: "page-type/temper-inventory-rule",
  slug: "rule-research-by-priority",
  title: "Research traits",
  description:
    "Routes equipment with researchable traits to the character that needs them most. Characters are checked in priority order using TemperCharacters saved variable data for cross-character trait knowledge. The current character is checked first via the ESO API; others are checked via saved data.",
  goal: "temper-rule-goal/unlock",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 42,
  action: "temper-item-action/research",
  active: true,
  updatedAt: "2026-05-04T16:05:00.238Z",
  locked: true,
  fromTemplate: "temper-rule-template/research-by-priority",
} as const satisfies TemperInventoryRule
