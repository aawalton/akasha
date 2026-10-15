import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const impale34851 = {
  id: "019e6f53-a35a-70f4-81ed-cacc7525ca72",
  type: "page-type/temper-skill",
  slug: "impale-34851",
  title: "Impale",
  key: "impale-34851",
  baseName: "Assassin's Blade",
  description:
    "Throw a magic blade with lethal precision to strike an enemy, dealing |cffffff4038|r Magic Damage. Deals |cffffff330|r% more damage to enemies below |cffffff25|r% Health.",
  icon: "/esoui/art/icons/ability_nightblade_017_b.dds",
  esoSkillId: 34851,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 666,
  createdAt: "2026-05-28T16:03:32.826Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 330 (Constant)",
    "<<3>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
