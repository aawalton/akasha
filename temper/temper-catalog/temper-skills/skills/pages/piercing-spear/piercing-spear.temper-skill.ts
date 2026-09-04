import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const piercingSpear = {
  id: "019e6245-a6e6-71d7-af84-8e4f6788555b",
  pageTypeSlug: "temper-skill",
  slug: "piercing-spear",
  title: "Piercing Spear",
  key: "piercing-spear",
  baseName: "Piercing Spear",
  description:
    '"Increases your Critical Damage by 12%. \\n\\nIncreases your damage done to blocking players by 12%."',
  icon: "/esoui/art/icons/ability_templar_022.dds",
  esoSkillId: 44046,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-aedric-spear",
  skillType: "passive",
  subcategoryId: "templar-aedric-spear",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
