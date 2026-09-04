import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deathStroke = {
  id: "019e6f53-a09f-76a3-be5c-3eff12ca8a87",
  pageTypeSlug: "temper-skill",
  slug: "death-stroke",
  title: "Death Stroke",
  key: "death-stroke",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a swift strike, dealing |cffffff12922|r Magic Damage and causing them to take |cffffff20|r% more damage from your attacks for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_007.dds",
  esoSkillId: 33398,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
