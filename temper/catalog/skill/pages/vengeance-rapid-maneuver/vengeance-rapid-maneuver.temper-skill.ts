import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRapidManeuver = {
  id: "019e6f53-a95e-7333-808d-61e118acacda",
  type: "page-type/temper-skill",
  slug: "vengeance-rapid-maneuver",
  title: "Vengeance Rapid Maneuver",
  key: "vengeance-rapid-maneuver",
  baseName: "Vengeance Rapid Maneuver",
  description:
    "Mobilize your forces, granting Major Expedition to up to 3 of you and your group, increasing your Movement Speed by |cffffff30|r% for |cffffff8|r seconds.",
  icon: "/esoui/art/icons/ability_ava_002.dds",
  esoSkillId: 244498,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1530,
  createdAt: "2026-05-28T16:03:34.366Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Expedition (Constant)",
    "<<2>> = Gallop (Constant)",
    "<<3>> = 6 (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 15 (Constant)",
    "<<6>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
