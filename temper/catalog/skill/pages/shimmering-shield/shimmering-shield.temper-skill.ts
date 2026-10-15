import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shimmeringShield = {
  id: "019e6245-a730-7287-98cb-a716d5caefc2",
  type: "page-type/temper-skill",
  slug: "shimmering-shield",
  title: "Shimmering Shield",
  key: "shimmering-shield",
  baseName: "Crystallized Shield",
  description:
    "Spin a shield of ice around you, absorbing up to 16527 damage from 3 projectiles. \n\nEach time you absorb a projectile you gain 2 Ultimate and gain Major Heroism for 6 seconds, granting you 3 Ultimate every 1.5 seconds.",
  icon: "/esoui/art/icons/ability_warden_002_b.dds",
  esoSkillId: 86146,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 1172,
  createdAt: "2026-05-26T03:13:12.496Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1.033 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 2 (Constant)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 3 (Constant)",
  ],
} as const satisfies TemperSkill
