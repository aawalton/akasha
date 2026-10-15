import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crushingShock46348 = {
  id: "019e6f53-a040-7c27-8cab-3c549e312ac3",
  type: "page-type/temper-skill",
  slug: "crushing-shock-46348",
  title: "Crushing Shock",
  key: "crushing-shock-46348",
  baseName: "Force Shock",
  description:
    "Focus all the elemental energies with your staff and blast an enemy for |cffffff2422|r Flame Damage, |cffffff2422|r Frost Damage, and |cffffff2422|r Shock Damage.\n\nEnemies hit while casting are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_destructionstaff_001a.dds",
  esoSkillId: 46348,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 268,
  createdAt: "2026-05-28T16:03:32.032Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Frost, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Shock, SingleTarget, Direct, R2 = 0.999998)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
