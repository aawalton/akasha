import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solventProficiency = {
  id: "019e6224-ccae-7f33-86df-ff1a843a8037",
  type: "page-type/temper-skill",
  slug: "solvent-proficiency",
  title: "Solvent Proficiency",
  key: "solvent-proficiency",
  baseName: "Solvent Proficiency",
  description:
    "Allows the Alchemist to use Lorkhan's Tears and Alkahest to make Champion 150 potions and poisons.",
  icon: "/esoui/art/icons/ability_alchemy_001.dds",
  esoAbilityId: 70043,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/craft-alchemy",
  skillType: "temper-skill-type/passive",
  hashPlace: 1219,
  createdAt: "2026-05-26T02:37:19.406Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
