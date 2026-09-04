import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const silverShards = {
  id: "019e6238-c30f-7905-a9a2-79caff70bfd6",
  pageTypeSlug: "temper-skill",
  slug: "silver-shards",
  title: "Silver Shards",
  key: "silver-shards",
  baseName: "Silver Bolts",
  description:
    '"Fire an augmented Dawnguard Vampire Hunter\'s crossbow bolt to strike an enemy, dealing 2091 Physical Damage.\\n\\nFires additional bolts at other enemies near the initial target for 22% less damage."',
  icon: "/esoui/art/icons/ability_fightersguild_003_a.dds",
  esoSkillId: 42671,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
