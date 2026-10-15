import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const destructiveTouch = {
  id: "019e6f53-a0c6-7483-8c7e-aba123c6fe74",
  type: "page-type/temper-skill",
  slug: "destructive-touch",
  title: "Destructive Touch",
  key: "destructive-touch",
  baseName: "Destructive Touch",
  description:
    "Devastate an enemy with an enhanced charge from your staff, dealing |cffffff4036|r Magic Damage and an additional |cffffff11420|r Magic Damage over |cffffff20|r seconds. \n\nThe initial hit always applies the element's status effect.",
  icon: "/esoui/art/icons/ability_destructionstaff_005.dds",
  esoSkillId: 29091,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 361,
  createdAt: "2026-05-28T16:03:32.166Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0150563 MaxStat + 0.157611 MaxPower - 2.12747 (Ultimate, ratio = 10.47, Dmg, Magic, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999993)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
