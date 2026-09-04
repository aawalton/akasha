import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const amphibian = {
  id: "019e624a-12bc-7a6e-8568-3957e36c03d4",
  pageTypeSlug: "temper-skill",
  slug: "amphibian",
  title: "Amphibian",
  key: "amphibian",
  baseName: "Amphibian",
  description:
    '"Increases your experience gain with the Restoration Staff skill line by 15%.\\n\\nIncreases your swimming speed by 50%."',
  icon: "/esoui/art/icons/ability_templar_010.dds",
  esoSkillId: 36582,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-argonian-skills",
  skillType: "passive",
  subcategoryId: "racial-argonian-skills",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
