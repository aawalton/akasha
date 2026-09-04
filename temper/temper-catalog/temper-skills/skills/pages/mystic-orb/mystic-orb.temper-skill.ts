import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticOrb = {
  id: "019e6238-c2f0-7dce-a2b4-4005eb722ce0",
  pageTypeSlug: "temper-skill",
  slug: "mystic-orb",
  title: "Mystic Orb",
  key: "mystic-orb",
  baseName: "Necrotic Orb",
  description:
    '"Project a globe of annihilation that slowly floats forward, dealing 326 Magic Damage every 1 second to nearby enemies. \\n\\nWhile the orb is active you gain 100 Health, Magicka, and Stamina Recovery.\\n\\nAn ally near the globe can activate the Combustion synergy, causing the orb to explode for 2249 Magic Damage to nearby enemies and restore 3960 Magicka or Stamina to the ally, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_undaunted_004_a.dds",
  esoSkillId: 43415,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
