import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const retreatingManeuver = {
  id: "019e6251-4ce0-77f4-8909-8b871112cc6e",
  pageTypeSlug: "temper-skill",
  slug: "retreating-maneuver",
  title: "Retreating Maneuver",
  key: "retreating-maneuver",
  baseName: "Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major Expedition to you and your group, increasing your Movement Speed by 30% for 8 seconds.  Attacks from behind deal 15% less damage while this effect persists."',
  icon: "/esoui/art/icons/ability_ava_002_a.dds",
  esoSkillId: 46505,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
