import type { TemperCompanionSkillLine } from "akasha/temper/catalog/temper-companions/temper-companion-skill-lines/temper-companion-skill-line.page-type.types.ts"

export const guildMages = {
  id: "01a05fce-c4aa-73ec-b7dd-015aa470f0ad",
  type: "temper-companion-skill-line",
  slug: "guild-mages",
  key: "guild-mages",
  title: "Mages Guild",
  companionId: "all",
  category: "guild",
  displayOrder: 40,
} as const satisfies TemperCompanionSkillLine
