import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dragonknightStandard = {
  id: "019e6f53-a0e8-75f4-b139-ac959397b730",
  type: "page-type/temper-skill",
  slug: "dragonknight-standard",
  title: "Dragonknight Standard",
  key: "dragonknight-standard",
  baseName: "Dragonknight Standard",
  description:
    "Call down a battle standard for |cffffff15|r seconds, rallying you and allies inside the area, increasing Weapon and Spell Damage by |cffffff300|r and reducing damage taken by |cffffff10|r%.\n\nAn ally near the standard can activate the Shackle synergy, dealing |cffffff12393|r Flame Damage to enemies in the area and immobilizing them for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_006.dds",
  esoSkillId: 28988,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 381,
  createdAt: "2026-05-28T16:03:32.200Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 270 (Constant)",
    "<<3>> = 7% (Constant)",
    "<<4>> = Shackle (Constant)",
    "<<5>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<6>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
