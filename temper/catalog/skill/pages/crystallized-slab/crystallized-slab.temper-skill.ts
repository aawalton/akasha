import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystallizedSlab = {
  id: "019e6245-a62c-73a4-8477-60070130a472",
  type: "page-type/temper-skill",
  slug: "crystallized-slab",
  title: "Crystallized Slab",
  key: "crystallized-slab",
  baseName: "Crystallized Shield",
  description:
    "Spin a shield of ice around you, absorbing up to 24791 damage from 3 projectiles. \n\nEach time you absorb a projectile you launch an icy bolt back at the enemy, dealing 1199 Frost Damage and stunning them for 3 seconds.",
  icon: "/esoui/art/icons/ability_warden_002_a.dds",
  esoSkillId: 86142,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 279,
  createdAt: "2026-05-26T03:13:12.236Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1.5495 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 0.0533085 MaxStat + 0.56047 MaxPower - 1.35721 (Ultimate, ratio = 10.51, Dmg, Frost, SingleTarget, Direct, R2 = 0.999999)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
