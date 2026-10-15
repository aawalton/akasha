import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stampede = {
  id: "019e6226-0117-7241-9965-fc4f21dc52bc",
  type: "page-type/temper-skill",
  slug: "stampede",
  title: "Stampede",
  key: "stampede",
  baseName: "Critical Charge",
  description:
    "Launch across the earth and smash an enemy, dealing 1393 Physical Damage to them and all nearby enemies. This attack is always a Critical Strike.\n\nAfter reaching your target, you sunder the ground beneath you, dealing 319 Physical Damage to all enemies in the area every 1 second for 15 seconds.",
  icon: "/esoui/art/icons/ability_2handed_003_a.dds",
  esoSkillId: 39807,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 1267,
  createdAt: "2026-05-26T02:38:38.359Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0143179 MaxStat + 0.148786 MaxPower - 1.73648 (Ultimate, ratio = 10.39, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999975)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
