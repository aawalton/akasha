import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceEntropy = {
  id: "019e6f53-a8ff-7be5-be72-043ce194bde0",
  type: "page-type/temper-skill",
  slug: "vengeance-entropy",
  title: "Vengeance Entropy",
  key: "vengeance-entropy",
  baseName: "Vengeance Entropy",
  description:
    "Bind an enemy with chaotic magic, dealing |cffffff16800|r Magic Damage over |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 246479,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1464,
  createdAt: "2026-05-28T16:03:34.271Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 16800 Magic Damage (Constant)", "<<2>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
