import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const highborn = {
  id: "019e624a-12cb-7664-8005-72574986fe5b",
  type: "page-type/temper-skill",
  slug: "highborn",
  title: "Highborn",
  key: "highborn",
  baseName: "Highborn",
  description:
    '"Increases your experience gain with the Destruction Staff skill line by 15%.\\n\\nIncreases your experience gained by 1%."',
  icon: "/esoui/art/icons/ability_templar_032.dds",
  esoSkillId: 35965,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-high-elf-skills",
  skillType: "temper-skill-type/passive",
  subcategoryId: "racial-high-elf-skills",
  status: "unsupported",
} as const satisfies TemperSkill
