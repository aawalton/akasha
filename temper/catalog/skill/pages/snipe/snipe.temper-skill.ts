import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const snipe = {
  id: "019e6f53-a744-7da8-86b1-34e8cec90fd0",
  type: "page-type/temper-skill",
  slug: "snipe",
  title: "Snipe",
  key: "snipe",
  baseName: "Snipe",
  description:
    "Plant a masterfully aimed arrow in an enemy's vital spot, dealing |cffffff8359|r Physical Damage.",
  icon: "/esoui/art/icons/ability_bow_001.dds",
  esoSkillId: 28882,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1211,
  createdAt: "2026-05-28T16:03:33.828Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1035 MaxStat + 1.08675 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, 0.8s cooldown, R2 = 1)",
  ],
} as const satisfies TemperSkill
