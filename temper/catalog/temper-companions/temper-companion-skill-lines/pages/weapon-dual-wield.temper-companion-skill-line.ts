import type { TemperCompanionSkillLine } from "akasha/temper/catalog/temper-companions/temper-companion-skill-lines/temper-companion-skill-line.page-type.types.ts"

export const weaponDualWield = {
  id: "01a05fce-c4ac-74e1-9b94-e14d56e474d6",
  type: "temper-companion-skill-line",
  slug: "weapon-dual-wield",
  key: "weapon-dual-wield",
  title: "Dual Wield",
  companionId: "all",
  category: "weapon",
  displayOrder: 35,
} as const satisfies TemperCompanionSkillLine
