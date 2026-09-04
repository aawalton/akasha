import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const craftsman = {
  id: "019e624a-12c3-7616-9535-00bd1f608e54",
  pageTypeSlug: "temper-skill",
  slug: "craftsman",
  title: "Craftsman",
  key: "craftsman",
  baseName: "Craftsman",
  description:
    '"Increases your experience gain with the Heavy Armor skill line by 15%.\\n\\nIncreases your crafting inspiration gained by 10%."',
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 33293,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-orc-skills",
  skillType: "passive",
  subcategoryId: "racial-orc-skills",
  status: "unsupported",
} as const satisfies TemperSkill
