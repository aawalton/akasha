import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const volley = {
  id: "019e6f53-a9d0-7dce-82d9-c21bffbc39e1",
  type: "page-type/temper-skill",
  slug: "volley",
  title: "Volley",
  key: "volley",
  baseName: "Volley",
  description:
    "Launch a multitude of arrows into the sky to rain down, dealing |cffffff1196|r Physical Damage to enemies in the target area every |cffffff1|r second for |cffffff8|r seconds, after a |cffffff2|r second delay.",
  icon: "/esoui/art/icons/ability_bow_003.dds",
  esoSkillId: 28876,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1605,
  createdAt: "2026-05-28T16:03:34.480Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0147919 MaxStat + 0.155883 MaxPower - 1.489 (Ultimate, ratio = 10.54, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999992)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
