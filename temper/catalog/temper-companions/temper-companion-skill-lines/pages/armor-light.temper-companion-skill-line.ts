import type { TemperCompanionSkillLine } from "akasha/temper/catalog/temper-companions/temper-companion-skill-lines/temper-companion-skill-line.page-type.types.ts"

export const armorLight = {
  id: "01a05fce-c49d-7c29-aa65-daaf2026a17e",
  type: "temper-companion-skill-line",
  slug: "armor-light",
  key: "armor-light",
  title: "Light Armor",
  companionId: "all",
  category: "armor",
  displayOrder: 42,
} as const satisfies TemperCompanionSkillLine
