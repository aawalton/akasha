import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDawnbreaker = {
  id: "019e6f53-a8e6-79ed-ac7d-d0b1edc2a6f6",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dawnbreaker",
  title: "Vengeance Dawnbreaker",
  key: "vengeance-dawnbreaker",
  baseName: "Vengeance Dawnbreaker",
  description:
    '"Arm yourself with Meridia\'s sacred sword and dispense her retribution, dealing |cffffff14700|r Physical Damage to up to 3 enemies in front of you and an additional |cffffff15750|r Physical Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_005.dds",
  esoSkillId: 246303,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "ultimate",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
