import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const razorCaltrops = {
  id: "019e6251-4cdb-7e0f-b379-0590451e9eed",
  type: "page-type/temper-skill",
  slug: "razor-caltrops",
  title: "Razor Caltrops",
  key: "razor-caltrops",
  baseName: "Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing 281 Physical Damage every 1 second to enemies inside, and reducing their Movement Speed by 50%.\n\nEnemies who take damage from the caltrops have Major Breach applied to them, reducing their Physical and Spell Resistance by 5948 for 4.1 seconds.",
  icon: "/esoui/art/icons/ability_ava_001_b.dds",
  esoSkillId: 46466,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 987,
  createdAt: "2026-05-26T03:25:55.803Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.01254 MaxStat + 0.131211 MaxPower - 0.630654 (Ultimate, ratio = 10.46, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999981)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 4.1 seconds (Constant)",
  ],
} as const satisfies TemperSkill
