import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDarkTalons = {
  id: "019e6f53-a8e5-7357-a6a1-95de73ed931c",
  type: "page-type/temper-skill",
  slug: "vengeance-dark-talons",
  title: "Vengeance Dark Talons",
  key: "vengeance-dark-talons",
  baseName: "Vengeance Dark Talons",
  description:
    "Call forth talons from the ground, dealing |cffffff8820|r Flame Damage to up to 3 enemies near you and immobilizing them for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_010.dds",
  esoSkillId: 237636,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 1446,
  createdAt: "2026-05-28T16:03:34.245Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7875 Flame Damage (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
