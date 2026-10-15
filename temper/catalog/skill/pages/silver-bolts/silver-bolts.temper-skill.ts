import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const silverBolts = {
  id: "019e6f53-a719-7d4e-859b-775602d9e7ed",
  type: "page-type/temper-skill",
  slug: "silver-bolts",
  title: "Silver Bolts",
  key: "silver-bolts",
  baseName: "Silver Bolts",
  description:
    "Fire a Dawnguard Vampire Hunter's crossbow bolt to strike an enemy, dealing |cffffff7269|r Physical Damage.",
  icon: "/esoui/art/icons/ability_fightersguild_003.dds",
  esoSkillId: 35721,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1186,
  createdAt: "2026-05-28T16:03:33.785Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09 MaxStat + 0.945 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
