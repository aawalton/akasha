import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystallizedSlab86139 = {
  id: "019e6f53-a050-795c-8fd9-aad66f3abed7",
  pageTypeSlug: "temper-skill",
  slug: "crystallized-slab-86139",
  title: "Crystallized Slab",
  key: "crystallized-slab-86139",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to |cffffff35136|r damage from |cffffff3|r projectiles. \\n\\nEach time you absorb a projectile you launch an icy bolt back at the enemy, dealing |cffffff4170|r Frost Damage and stunning them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_warden_002_a.dds",
  esoSkillId: 86139,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
