import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soothingSpores85863 = {
  id: "019e6f53-a75a-7cb2-b546-87d1081a8d3f",
  type: "page-type/temper-skill",
  slug: "soothing-spores-85863",
  title: "Soothing Spores",
  key: "soothing-spores-85863",
  baseName: "Fungal Growth",
  description:
    "Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8489|r Health.\n\nHeals for |cffffff15|r% more on allies that are within |cffffff8|r meters of you.",
  icon: "/esoui/art/icons/ability_warden_008_a.dds",
  esoSkillId: 85863,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 1221,
  createdAt: "2026-05-28T16:03:33.850Z",
  updatedAt: "2026-10-21T05:02:44.400Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
