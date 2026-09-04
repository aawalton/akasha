import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const acrobat = {
  id: "019e624a-12b9-798a-9982-64a12171e461",
  pageTypeSlug: "temper-skill",
  slug: "acrobat",
  title: "Acrobat",
  key: "acrobat",
  baseName: "Acrobat",
  description:
    '"Increases your experience gain with the Bow skill line by 15%.\\n\\nDecreases your fall damage taken by 10%."',
  icon: "/esoui/art/icons/passive_weapon_025.dds",
  esoSkillId: 36008,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
  status: "unsupported",
} as const satisfies TemperSkill
