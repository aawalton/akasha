import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crushingShock = {
  id: "019e6226-00de-7523-bff2-1f6feb729813",
  type: "page-type/temper-skill",
  slug: "crushing-shock",
  title: "Crushing Shock",
  key: "crushing-shock",
  baseName: "Force Shock",
  description:
    "Focus all the elemental energies with your staff and blast an enemy for 696 Flame Damage, 696 Frost Damage, and 696 Shock Damage.\n\nEnemies hit while casting are interrupted, set Off Balance, and stunned for 3 seconds.",
  icon: "/esoui/art/icons/ability_destructionstaff_001a.dds",
  esoSkillId: 48971,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 267,
  createdAt: "2026-05-26T02:38:38.302Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Frost, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Shock, SingleTarget, Direct, R2 = 0.999998)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
