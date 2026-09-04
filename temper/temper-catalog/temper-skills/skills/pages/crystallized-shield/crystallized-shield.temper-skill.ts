import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystallizedShield = {
  id: "019e6f53-a04d-7d86-91fe-597e30fe9f8b",
  pageTypeSlug: "temper-skill",
  slug: "crystallized-shield",
  title: "Crystallized Shield",
  key: "crystallized-shield",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to |cffffff23424|r damage from |cffffff3|r projectiles. \\n\\nEach time you absorb a projectile you gain |cffffff2|r Ultimate."',
  icon: "/esoui/art/icons/ability_warden_002.dds",
  esoSkillId: 86135,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
