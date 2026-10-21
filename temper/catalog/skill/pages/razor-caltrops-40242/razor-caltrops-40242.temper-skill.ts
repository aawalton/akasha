import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const razorCaltrops40242 = {
  id: "019e6f53-a5b7-75a2-9ad7-e4123389ac64",
  type: "page-type/temper-skill",
  slug: "razor-caltrops-40242",
  title: "Razor Caltrops",
  key: "razor-caltrops-40242",
  baseName: "Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing |cffffff978|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%.\n\nEnemies who take damage from the caltrops have Major Breach applied to them, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff4.1|r seconds.",
  icon: "/esoui/art/icons/ability_ava_001_b.dds",
  esoSkillId: 40242,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 988,
  createdAt: "2026-05-28T16:03:33.431Z",
  updatedAt: "2026-10-21T04:43:53.309Z",
  equations: [
    "<<1>> = 0.01254 MaxStat + 0.131211 MaxPower - 0.630654 (Ultimate, ratio = 10.46, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999981)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 4.1 seconds (Constant)",
  ],
} as const satisfies TemperSkill
