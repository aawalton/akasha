import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const timeFreeze104079 = {
  id: "019e6f53-a842-789f-8cd0-079be14544e6",
  pageTypeSlug: "temper-skill",
  slug: "time-freeze-104079",
  title: "Time Freeze",
  key: "time-freeze-104079",
  baseName: "Time Stop",
  description:
    '"Freeze the passage of time at the target location, gradually reducing the Movement Speed of enemies in the area over |cffffff4|r seconds before finally stunning them in place for |cffffff3|r seconds when the duration completes."',
  icon: "/esoui/art/icons/ability_psijic_002_b.dds",
  esoSkillId: 104079,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
