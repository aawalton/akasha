import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystallizedSlab = {
  id: "019e6245-a62c-73a4-8477-60070130a472",
  pageTypeSlug: "temper-skill",
  slug: "crystallized-slab",
  title: "Crystallized Slab",
  key: "crystallized-slab",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to 24791 damage from 3 projectiles. \\n\\nEach time you absorb a projectile you launch an icy bolt back at the enemy, dealing 1199 Frost Damage and stunning them for 3 seconds."',
  icon: "/esoui/art/icons/ability_warden_002_a.dds",
  esoSkillId: 86142,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
