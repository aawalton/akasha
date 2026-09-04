import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const metalExtraction = {
  id: "019e6224-cca3-7a12-a2d2-e4db0a2d411d",
  pageTypeSlug: "temper-skill",
  slug: "metal-extraction",
  title: "Metal Extraction",
  key: "metal-extraction",
  baseName: "Metal Extraction",
  description:
    '"Maximizes the chances of extracting Blacksmithing ingredients and allows the refining of the most powerful tempers from raw materials."',
  icon: "/esoui/art/icons/ability_smith_003.dds",
  esoSkillId: 48165,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
