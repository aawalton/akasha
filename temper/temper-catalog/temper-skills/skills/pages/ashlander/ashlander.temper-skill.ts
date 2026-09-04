import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ashlander = {
  id: "019e624a-12bf-791e-a836-4fd14d94080d",
  pageTypeSlug: "temper-skill",
  slug: "ashlander",
  title: "Ashlander",
  key: "ashlander",
  baseName: "Ashlander",
  description:
    '"Increases your experience gain with the Dual Wield skill line by 15%.\\n\\nReduces your damage taken from environmental lava by 50%."',
  icon: "/esoui/art/icons/ability_weapon_016.dds",
  esoSkillId: 36588,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-dark-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-dark-elf-skills",
  status: "unsupported",
} as const satisfies TemperSkill
