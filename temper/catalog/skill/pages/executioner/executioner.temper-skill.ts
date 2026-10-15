import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const executioner = {
  id: "019e6226-00ef-7896-a308-07d6cd532b94",
  type: "page-type/temper-skill",
  slug: "executioner",
  title: "Executioner",
  key: "executioner",
  baseName: "Reverse Slash",
  description:
    "Spin around and strike an enemy down, dealing 1161 Bleed Damage. Deals up to 400% more damage to enemies with less than 50% Health.",
  icon: "/esoui/art/icons/ability_2handed_004_a.dds",
  esoSkillId: 39957,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 471,
  createdAt: "2026-05-26T02:38:38.319Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 400 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
