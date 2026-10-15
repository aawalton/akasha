import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chargingManeuver40215 = {
  id: "019e6f53-9fdc-7824-b2b8-a31c73cc505f",
  type: "page-type/temper-skill",
  slug: "charging-maneuver-40215",
  title: "Charging Maneuver",
  key: "charging-maneuver-40215",
  baseName: "Rapid Maneuver",
  description:
    "Mobilize your forces, granting Major and Minor Expedition to you and your group, increasing your Movement Speed by |cffffff30|r% and |cffffff15|r% respectively, for |cffffff8|r seconds.",
  icon: "/esoui/art/icons/ability_ava_002_b.dds",
  esoSkillId: 40215,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 207,
  createdAt: "2026-05-28T16:03:31.932Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 30% (Constant)", "<<2>> = 15% (Constant)", "<<3>> = 8 seconds (Constant)"],
} as const satisfies TemperSkill
