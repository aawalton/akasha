import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const borrowedTime = {
  id: "019e6238-c29d-71e1-b42f-bb0baba1e0c2",
  pageTypeSlug: "temper-skill",
  slug: "borrowed-time",
  title: "Borrowed Time",
  key: "borrowed-time",
  baseName: "Time Stop",
  description:
    '"Freeze the passage of time at the target location, gradually reducing the Movement Speed of enemies in the area during the channel before finally stunning them in place for 3 seconds when the channel completes.\\n\\nEnemies that are stunned gain 5000 Heal Absorption for 3 seconds, negating the next 5000 points of healing done."',
  icon: "/esoui/art/icons/ability_psijic_002_a.dds",
  esoSkillId: 40104059,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
