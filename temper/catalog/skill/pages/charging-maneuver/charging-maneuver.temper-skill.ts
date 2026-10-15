import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chargingManeuver = {
  id: "019e6251-4c97-769c-a0ae-1618ca496454",
  type: "page-type/temper-skill",
  slug: "charging-maneuver",
  title: "Charging Maneuver",
  key: "charging-maneuver",
  baseName: "Rapid Maneuver",
  description:
    "Mobilize your forces, granting Major and Minor Expedition to you and your group, increasing your Movement Speed by 30% and 15% respectively, for 8 seconds.",
  icon: "/esoui/art/icons/ability_ava_002_b.dds",
  esoSkillId: 46519,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 206,
  createdAt: "2026-05-26T03:25:55.735Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 30% (Constant)", "<<2>> = 15% (Constant)", "<<3>> = 8 seconds (Constant)"],
} as const satisfies TemperSkill
