import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const negateMagic = {
  id: "019e6f53-a4bd-7ae5-8315-56e5aed2be06",
  pageTypeSlug: "temper-skill",
  slug: "negate-magic",
  title: "Negate Magic",
  key: "negate-magic",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned."',
  icon: "/esoui/art/icons/ability_sorcerer_monsoon.dds",
  esoSkillId: 27706,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
