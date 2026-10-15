import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const livingTrellis85851 = {
  id: "019e6f53-a414-7b38-b678-f2e6be3075e0",
  type: "page-type/temper-skill",
  slug: "living-trellis-85851",
  title: "Living Trellis",
  key: "living-trellis-85851",
  baseName: "Living Vines",
  description:
    "Grow vines to embrace you or the lowest health ally in front of you for |cffffff10|r seconds. The vines heal the target for |cffffff2262|r Health each time they take damage. This effect can occur once every |cffffff1|r second.\n\nWhen the vines expire, they heal the target for an additional |cffffff5478|r Health.",
  icon: "/esoui/art/icons/ability_warden_010_b.dds",
  esoSkillId: 85851,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 763,
  createdAt: "2026-05-28T16:03:33.012Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Heal, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 0.0749181 MaxStat + 0.787428 MaxPower + 0.553891 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
