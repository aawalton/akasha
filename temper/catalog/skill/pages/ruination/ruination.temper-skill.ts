import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ruination = {
  id: "019e624a-12dc-7ff1-938c-4bea7e83dc1d",
  type: "page-type/temper-skill",
  slug: "ruination",
  title: "Ruination",
  key: "ruination",
  baseName: "Ruination",
  description: '"Increases your Weapon and Spell Damage by 258."',
  icon: "/esoui/art/icons/ability_sorcerer_062.dds",
  esoSkillId: 45272,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-dark-elf-skills",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
