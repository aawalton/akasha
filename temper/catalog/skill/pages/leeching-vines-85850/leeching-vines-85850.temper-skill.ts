import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const leechingVines85850 = {
  id: "019e6f53-a3d9-7c7b-b354-8121cc731c69",
  type: "page-type/temper-skill",
  slug: "leeching-vines-85850",
  title: "Leeching Vines",
  key: "leeching-vines-85850",
  baseName: "Living Vines",
  description:
    "Grow vines to embrace you or the lowest health ally in front of you for |cffffff10|r seconds. The vines heal the target for |cffffff2262|r Health each time they take damage. This effect can occur once every |cffffff1|r second.\n\nThe vines apply Minor Lifesteal to enemies that damage the target for |cffffff10|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging that enemy.",
  icon: "/esoui/art/icons/ability_warden_010_a.dds",
  esoSkillId: 85850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 734,
  createdAt: "2026-05-28T16:03:32.953Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Heal, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 600 (Constant)",
    "<<6>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
