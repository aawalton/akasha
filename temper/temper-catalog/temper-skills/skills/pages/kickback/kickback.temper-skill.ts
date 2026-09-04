import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const kickback = {
  id: "019e6251-4ccb-7838-b518-e0eaa986fc19",
  pageTypeSlug: "temper-skill",
  slug: "kickback",
  title: "Kickback",
  key: "kickback",
  baseName: "Kickback",
  description: '"Reduces bounties you willingly pay to guards and fences by 40%."',
  icon: "/esoui/art/icons/ability_legerdemain_sly.dds",
  esoSkillId: 63818,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-legerdemain",
  skillType: "passive",
  subcategoryId: "world-legerdemain",
} as const satisfies TemperSkill
