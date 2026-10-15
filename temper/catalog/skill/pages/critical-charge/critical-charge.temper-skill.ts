import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const criticalCharge = {
  id: "019e6f53-a035-7736-8071-908d23594fbe",
  type: "page-type/temper-skill",
  slug: "critical-charge",
  title: "Critical Charge",
  key: "critical-charge",
  baseName: "Critical Charge",
  description:
    "Launch across the earth and smash an enemy, dealing |cffffff4846|r Physical Damage. \n\nThis attack is always a Critical Strike.",
  icon: "/esoui/art/icons/ability_2handed_003.dds",
  esoSkillId: 28448,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 262,
  createdAt: "2026-05-28T16:03:32.021Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
