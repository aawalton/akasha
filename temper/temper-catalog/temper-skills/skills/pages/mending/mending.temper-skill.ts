import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mending = {
  id: "019e6245-a6ce-743c-9ea8-579dea937d6e",
  pageTypeSlug: "temper-skill",
  slug: "mending",
  title: "Mending",
  key: "mending",
  baseName: "Mending",
  description:
    '"Increases your healing done by up to 13%, in proportion to the severity of the target\'s wounds."',
  icon: "/esoui/art/icons/ability_templar_004.dds",
  esoSkillId: 45206,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
  status: "unsupported",
} as const satisfies TemperSkill
