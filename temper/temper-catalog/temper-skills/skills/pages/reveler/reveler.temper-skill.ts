import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reveler = {
  id: "019e624a-12da-7cba-8d56-4f6efdf9bcc4",
  pageTypeSlug: "temper-skill",
  slug: "reveler",
  title: "Reveler",
  key: "reveler",
  baseName: "Reveler",
  description:
    '"Increases your experience gain with the Two Handed skill line by 15%.\\n\\nIncreases the duration of any consumed drink by 15 minutes."',
  icon: "/esoui/art/icons/ability_dragonknight_032.dds",
  esoSkillId: 36626,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
  status: "unsupported",
} as const satisfies TemperSkill
