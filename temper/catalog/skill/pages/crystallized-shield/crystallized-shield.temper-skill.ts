import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystallizedShield = {
  id: "019e6f53-a04d-7d86-91fe-597e30fe9f8b",
  type: "page-type/temper-skill",
  slug: "crystallized-shield",
  title: "Crystallized Shield",
  key: "crystallized-shield",
  baseName: "Crystallized Shield",
  description:
    "Spin a shield of ice around you, absorbing up to |cffffff23424|r damage from |cffffff3|r projectiles. \n\nEach time you absorb a projectile you gain |cffffff2|r Ultimate.",
  icon: "/esoui/art/icons/ability_warden_002.dds",
  esoSkillId: 86135,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 278,
  createdAt: "2026-05-28T16:03:32.045Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 2 (Constant)",
  ],
} as const satisfies TemperSkill
