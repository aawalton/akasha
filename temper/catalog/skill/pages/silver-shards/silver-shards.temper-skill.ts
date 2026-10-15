import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const silverShards = {
  id: "019e6238-c30f-7905-a9a2-79caff70bfd6",
  type: "page-type/temper-skill",
  slug: "silver-shards",
  title: "Silver Shards",
  key: "silver-shards",
  baseName: "Silver Bolts",
  description:
    "Fire an augmented Dawnguard Vampire Hunter's crossbow bolt to strike an enemy, dealing 2091 Physical Damage.\n\nFires additional bolts at other enemies near the initial target for 22% less damage.",
  icon: "/esoui/art/icons/ability_fightersguild_003_a.dds",
  esoSkillId: 42671,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1189,
  createdAt: "2026-05-26T02:59:07.663Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09297 MaxStat + 0.976185 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, R2 = 1)",
    "<<2>> = 22% (Constant)",
  ],
} as const satisfies TemperSkill
