import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const necroticOrb = {
  id: "019e6f53-a4b9-7198-9078-d6373119fbb2",
  pageTypeSlug: "temper-skill",
  slug: "necrotic-orb",
  title: "Necrotic Orb",
  key: "necrotic-orb",
  baseName: "Necrotic Orb",
  description:
    '"Project a globe of annihilation that slowly floats forward for |cffffff10|r seconds, dealing |cffffff1100|r Magic Damage every |cffffff1|r second to nearby enemies. \\n\\nAn ally near the globe can activate the Combustion synergy, causing the orb to explode for |cffffff8261|r Magic Damage to nearby enemies and restore |cffffff3960|r Magicka or Stamina to the ally, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_undaunted_004.dds",
  esoSkillId: 39298,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
