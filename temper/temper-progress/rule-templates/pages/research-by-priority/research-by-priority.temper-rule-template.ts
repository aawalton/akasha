import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const researchByPriority = {
  id: "019e3104-2612-7978-b397-84d0e1644a40",
  pageTypeSlug: "temper-rule-template",
  slug: "research-by-priority",
  title: "Research traits",
  key: "research-by-priority",
  description:
    "Routes equipment with researchable traits to the character that needs them most. Characters are checked in priority order using TemperCharacters saved variable data for cross-character trait knowledge. The current character is checked first via the ESO API; others are checked via saved data.",
  categoryId: "equipment",
  displayOrder: 14,
  action: "research",
  active: false,
  goal: "unlock",
  destination: "character:by-priority",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
