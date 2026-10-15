import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const forcePulse46356 = {
  id: "019e6f53-a227-7ebb-9c36-d57308e90fcb",
  type: "page-type/temper-skill",
  slug: "force-pulse-46356",
  title: "Force Pulse",
  key: "force-pulse-46356",
  baseName: "Force Shock",
  description:
    "Focus all the elemental energies with your staff and blast an enemy for |cffffff2422|r Flame Damage, |cffffff2422|r Frost Damage, and |cffffff2422|r Shock Damage. \n\nUp to 2 nearby enemies will take \n|cffffff8342|r Magic Damage if they were already afflicted with a status effect.",
  icon: "/esoui/art/icons/ability_destructionstaff_001b.dds",
  esoSkillId: 46356,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 532,
  createdAt: "2026-05-28T16:03:32.519Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Frost, SingleTarget, Direct, R2 = 0.999998)",
    "<<3>> = 0.0310259 MaxStat + 0.325425 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Shock, SingleTarget, Direct, R2 = 0.999998)",
    "<<4>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
