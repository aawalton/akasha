import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chokingTalons20251 = {
  id: "019e6f53-9fe2-78ba-987a-9b47c62a8d6b",
  type: "page-type/temper-skill",
  slug: "choking-talons-20251",
  title: "Choking Talons",
  key: "choking-talons-20251",
  baseName: "Dark Talons",
  description:
    "Call forth talons from the ground, dealing |cffffff6401|r Flame Damage to enemies near you and immobilizing them for |cffffff4|r seconds. \n\nEnemies hit are afflicted with Minor Maim, reducing damage done by |cffffff5|r% for |cffffff20|r seconds. \n\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them.",
  icon: "/esoui/art/icons/ability_dragonknight_010_a.dds",
  esoSkillId: 20251,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 210,
  createdAt: "2026-05-28T16:03:31.938Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Minor Maim (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 17 seconds (Constant)",
    "<<6>> = Ignite (Constant)",
    "<<7>> = 0.125 MaxStat + 1.3125 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
