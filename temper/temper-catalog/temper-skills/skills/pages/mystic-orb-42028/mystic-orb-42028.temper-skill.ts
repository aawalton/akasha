import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticOrb42028 = {
  id: "019e6f53-a4a8-7507-8425-a5fb23a28a81",
  pageTypeSlug: "temper-skill",
  slug: "mystic-orb-42028",
  title: "Mystic Orb",
  key: "mystic-orb-42028",
  baseName: "Necrotic Orb",
  description:
    '"Project a globe of annihilation that slowly floats forward, dealing |cffffff1136|r Magic Damage every |cffffff1|r second to nearby enemies. \\n\\nWhile the orb is active you gain |cffffff100|r Health, Magicka, and Stamina Recovery.\\n\\nAn ally near the globe can activate the Combustion synergy, causing the orb to explode for |cffffff8261|r Magic Damage to nearby enemies and restore |cffffff3960|r Magicka or Stamina to the ally, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_undaunted_004_a.dds",
  esoSkillId: 42028,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
