import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const uppercut = {
  id: "019e6f53-a89f-7a0c-932b-87149e6a03db",
  type: "page-type/temper-skill",
  slug: "uppercut",
  title: "Uppercut",
  key: "uppercut",
  baseName: "Uppercut",
  description: "Slam an enemy with an upward swing, dealing |cffffff9288|r Physical Damage.",
  icon: "/esoui/art/icons/ability_2handed_001.dds",
  esoSkillId: 28279,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 1399,
  createdAt: "2026-05-28T16:03:34.175Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.115 MaxStat + 1.2075 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, 0.5s cooldown, R2 = 1)",
  ],
} as const satisfies TemperSkill
