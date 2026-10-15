import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkTalons = {
  id: "019e6f53-a07f-7496-99f8-e01b32569b04",
  type: "page-type/temper-skill",
  slug: "dark-talons",
  title: "Dark Talons",
  key: "dark-talons",
  baseName: "Dark Talons",
  description:
    "Call forth talons from the ground, dealing |cffffff6400|r Flame Damage to enemies near you and immobilizing them for |cffffff4|r seconds. \n\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them.",
  icon: "/esoui/art/icons/ability_dragonknight_010.dds",
  esoSkillId: 20245,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 314,
  createdAt: "2026-05-28T16:03:32.095Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Ignite (Constant)",
    "<<4>> = 0.125 MaxStat + 1.3125 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
