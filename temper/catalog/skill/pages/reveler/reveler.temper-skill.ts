import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reveler = {
  id: "019e624a-12da-7cba-8d56-4f6efdf9bcc4",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/racial-nord-skills",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
} as const satisfies TemperSkill
