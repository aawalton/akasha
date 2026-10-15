import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const killersBlade = {
  id: "019e6245-a6b7-7af8-a274-ae32fe0dc877",
  type: "page-type/temper-skill",
  slug: "killers-blade",
  title: "Killer's Blade",
  key: "killers-blade",
  baseName: "Assassin's Blade",
  description:
    "Thrust a caustic blade with lethal precision to stab an enemy, dealing 1161 Disease Damage. Deals up to 400% more damage to enemies with less than 50% Health.\n\nHeals you for 2399 if the enemy dies within 2 seconds of being struck.",
  icon: "/esoui/art/icons/ability_nightblade_017_a.dds",
  esoSkillId: 35590,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 722,
  createdAt: "2026-05-26T03:13:12.375Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 400 (Constant)",
    "<<3>> = 50 (Constant)",
    "<<4>> = 0.106622 MaxStat + 1.12092 MaxPower - 1.569 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
