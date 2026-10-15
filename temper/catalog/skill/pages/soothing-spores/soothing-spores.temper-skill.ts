import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soothingSpores = {
  id: "019e6245-a738-7df0-8e71-7269cd7e2b8b",
  type: "page-type/temper-skill",
  slug: "soothing-spores",
  title: "Soothing Spores",
  key: "soothing-spores",
  baseName: "Fungal Growth",
  description:
    "Seed a large area of mushrooms in front of you, healing you and your allies for 2700 Health.\n\nHeals for 15% more on allies that are within 8 meters of you.",
  icon: "/esoui/art/icons/ability_warden_008_a.dds",
  esoSkillId: 93777,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 1220,
  createdAt: "2026-05-26T03:13:12.504Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.120048029 MaxStat + 1.26049759 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
