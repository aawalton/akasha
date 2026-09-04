import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const timeStop = {
  id: "019e6f53-a843-7eb3-b870-44fc28a8404e",
  pageTypeSlug: "temper-skill",
  slug: "time-stop",
  title: "Time Stop",
  key: "time-stop",
  baseName: "Time Stop",
  description:
    '"Freeze the passage of time at the target location, gradually reducing the Movement Speed of enemies in the area during the channel before finally stunning them in place for |cffffff3|r seconds when the channel completes."',
  icon: "/esoui/art/icons/ability_psijic_002.dds",
  esoSkillId: 103488,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
