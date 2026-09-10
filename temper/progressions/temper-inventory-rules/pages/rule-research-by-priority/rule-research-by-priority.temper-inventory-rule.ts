import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleResearchByPriority = {
  id: "01a0728b-6d6e-7d08-943c-060decea6265",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-research-by-priority",
  title: "Research traits",
  description:
    "Routes equipment with researchable traits to the character that needs them most. Characters are checked in priority order using TemperCharacters saved variable data for cross-character trait knowledge. The current character is checked first via the ESO API; others are checked via saved data.",
  goal: "unlock",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 41,
  action: "research",
  active: true,
  updatedAt: "2026-05-04T16:05:00.238Z",
  locked: true,
  fromTemplate: "research-by-priority",
} as const satisfies TemperInventoryRule
