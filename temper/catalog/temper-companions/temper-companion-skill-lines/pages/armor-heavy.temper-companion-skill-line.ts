import type { TemperCompanionSkillLine } from "akasha/temper/catalog/temper-companions/temper-companion-skill-lines/temper-companion-skill-line.page-type.types.ts"

export const armorHeavy = {
  id: "01a05fce-c49c-7122-920d-623baf1cd369",
  pageTypeSlug: "temper-companion-skill-line",
  type: "temper-companion-skill-line",
  slug: "armor-heavy",
  key: "armor-heavy",
  title: "Heavy Armor",
  companionId: "all",
  category: "armor",
  displayOrder: 44,
} as const satisfies TemperCompanionSkillLine
