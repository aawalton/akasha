import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const yffresEndurance = {
  id: "019e624a-12e7-7d8b-8051-62f62f514e0a",
  type: "page-type/temper-skill",
  slug: "yffres-endurance",
  title: "Y'ffre's Endurance",
  key: "yffres-endurance",
  baseName: "Y'ffre's Endurance",
  description: '"Increases your Stamina Recovery by 258."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 64281,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-wood-elf-skills",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
