import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalTalent = {
  id: "019e624a-12c7-7fc6-9ac0-181e6f05fbc3",
  pageTypeSlug: "temper-skill",
  slug: "elemental-talent",
  title: "Elemental Talent",
  key: "elemental-talent",
  baseName: "Elemental Talent",
  description: '"Increases your Weapon and Spell Damage by 258."',
  icon: "/esoui/art/icons/ability_armor_005.dds",
  esoSkillId: 45276,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
