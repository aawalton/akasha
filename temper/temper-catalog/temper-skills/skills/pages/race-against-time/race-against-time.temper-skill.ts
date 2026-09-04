import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const raceAgainstTime = {
  id: "019e6238-c2fa-7b8a-aa47-663b43875c8e",
  pageTypeSlug: "temper-skill",
  slug: "race-against-time",
  title: "Race Against Time",
  key: "race-against-time",
  baseName: "Accelerate",
  description:
    '"Bend time and space around you to gain Major Expedition for 4 seconds and Minor Force for 20 seconds, increasing your Movement Speed by 30% and Critical Damage by 10%.\\n\\nActivating this ability removes all snares and immobilizations from you and grants immunity to them for 4 seconds."',
  icon: "/esoui/art/icons/ability_psijic_005_b.dds",
  esoSkillId: 40103710,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
