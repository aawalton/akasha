import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const weaponTwoHanded = {
  id: "019e61dc-f1bf-7342-8837-568a7e844e15",
  pageTypeSlug: "temper-skill-line",
  slug: "weapon-two-handed",
  title: "Two Handed",
  key: "weapon-two-handed",
  displayOrder: 22,
  esoSkillLineId: 30,
  maxRank: 50,
  subcategoryId: "weapon",
} as const satisfies TemperSkillLine
