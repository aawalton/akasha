import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const endlessHail = {
  id: "019e6226-00ed-7e44-81a7-47b4f2f7efe3",
  type: "page-type/temper-skill",
  slug: "endless-hail",
  title: "Endless Hail",
  key: "endless-hail",
  baseName: "Volley",
  description:
    "Launch a multitude of arrows into the sky to rain down, dealing 343 Physical Damage to enemies in the target area every 1 second for 13 seconds, after a 2 second delay.",
  icon: "/esoui/art/icons/ability_bow_003_a.dds",
  esoSkillId: 40932,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 433,
  createdAt: "2026-05-26T02:38:38.317Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.015261 MaxStat + 0.161049 MaxPower - 1.38234 (Ultimate, ratio = 10.55, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999992)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 13 seconds (Constant)",
  ],
} as const satisfies TemperSkill
