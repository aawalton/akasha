import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const forcePulse = {
  id: "019e6226-00f3-78de-b2b6-4a20fa82b85e",
  type: "page-type/temper-skill",
  slug: "force-pulse",
  title: "Force Pulse",
  key: "force-pulse",
  baseName: "Force Shock",
  description:
    "Focus all the elemental energies with your staff and blast an enemy for 696 Flame Damage, 696 Frost Damage, and 696 Shock Damage. \n\nUp to 2 nearby enemies will take \n2399 Magic Damage if they were already afflicted with a status effect.",
  icon: "/esoui/art/icons/ability_destructionstaff_001b.dds",
  esoSkillId: 48991,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 531,
  createdAt: "2026-05-26T02:38:38.323Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Frost, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Shock, SingleTarget, Direct, R2 = 0.999998)",
    "<<4>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
