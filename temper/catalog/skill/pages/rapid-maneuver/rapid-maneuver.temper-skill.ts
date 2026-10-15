import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidManeuver = {
  id: "019e6f53-a5a1-7cf7-8295-9eb5e7de5a23",
  type: "page-type/temper-skill",
  slug: "rapid-maneuver",
  title: "Rapid Maneuver",
  key: "rapid-maneuver",
  baseName: "Rapid Maneuver",
  description:
    "Mobilize your forces, granting Major Expedition to you and your group, increasing your Movement Speed by |cffffff30|r% for |cffffff8|r seconds.",
  icon: "/esoui/art/icons/ability_ava_002.dds",
  esoSkillId: 38566,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 977,
  createdAt: "2026-05-28T16:03:33.409Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Expedition (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
