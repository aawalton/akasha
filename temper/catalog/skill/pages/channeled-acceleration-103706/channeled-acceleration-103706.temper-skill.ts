import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const channeledAcceleration103706 = {
  id: "019e6f53-9fd5-73d9-8273-4706779e2d8f",
  type: "page-type/temper-skill",
  slug: "channeled-acceleration-103706",
  title: "Channeled Acceleration",
  key: "channeled-acceleration-103706",
  baseName: "Accelerate",
  description:
    "Bend time and space around you to gain Major Expedition for |cffffff12|r seconds and Minor Force for |cffffff1|r minute, increasing your Movement Speed by |cffffff30|r% and Critical Damage by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_psijic_005_a.dds",
  esoSkillId: 103706,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 203,
  createdAt: "2026-05-28T16:03:31.925Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 seconds (Constant)",
    "<<2>> = 1 minute (Constant)",
    "<<3>> = 30% (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
