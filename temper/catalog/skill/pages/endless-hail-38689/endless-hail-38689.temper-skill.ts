import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const endlessHail38689 = {
  id: "019e6f53-a173-7e43-ba85-151da040daac",
  type: "page-type/temper-skill",
  slug: "endless-hail-38689",
  title: "Endless Hail",
  key: "endless-hail-38689",
  baseName: "Volley",
  description:
    "Launch a multitude of arrows into the sky to rain down, dealing |cffffff1196|r Physical Damage to enemies in the target area every |cffffff1|r second for |cffffff13|r seconds, after a |cffffff2|r second delay.",
  icon: "/esoui/art/icons/ability_bow_003_a.dds",
  esoSkillId: 38689,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 434,
  createdAt: "2026-05-28T16:03:32.339Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.015261 MaxStat + 0.161049 MaxPower - 1.38234 (Ultimate, ratio = 10.55, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999992)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
