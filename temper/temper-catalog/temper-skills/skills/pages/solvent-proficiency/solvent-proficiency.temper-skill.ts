import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solventProficiency = {
  id: "019e6224-ccae-7f33-86df-ff1a843a8037",
  pageTypeSlug: "temper-skill",
  slug: "solvent-proficiency",
  title: "Solvent Proficiency",
  key: "solvent-proficiency",
  baseName: "Solvent Proficiency",
  description:
    '"Allows the Alchemist to use Lorkhan\'s Tears and Alkahest to make Champion 150 potions and poisons."',
  icon: "/esoui/art/icons/ability_alchemy_001.dds",
  esoSkillId: 70043,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 8,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
