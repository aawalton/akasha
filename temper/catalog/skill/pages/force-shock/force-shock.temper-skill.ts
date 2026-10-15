import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const forceShock = {
  id: "019e6f53-a22a-7169-ba45-ee192e534f73",
  type: "page-type/temper-skill",
  slug: "force-shock",
  title: "Force Shock",
  key: "force-shock",
  baseName: "Force Shock",
  description:
    "Focus all the elemental energies with your staff and blast an enemy for |cffffff2423|r Flame Damage, |cffffff2423|r Frost Damage, and |cffffff2423|r Shock Damage.",
  icon: "/esoui/art/icons/ability_destructionstaff_001.dds",
  esoSkillId: 46340,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 533,
  createdAt: "2026-05-28T16:03:32.522Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03 MaxStat + 0.315 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.029932 MaxStat + 0.315736 MaxPower - 1.70809 (Ultimate, ratio = 10.55, Dmg, Frost, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 0.029932 MaxStat + 0.315736 MaxPower - 1.70809 (Ultimate, ratio = 10.55, Dmg, Shock, SingleTarget, Direct, R2 = 0.999998)",
  ],
} as const satisfies TemperSkill
