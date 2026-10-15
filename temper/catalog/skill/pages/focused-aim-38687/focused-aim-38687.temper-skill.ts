import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const focusedAim38687 = {
  id: "019e6f53-a21e-7888-afc9-5eea2c864d62",
  type: "page-type/temper-skill",
  slug: "focused-aim-38687",
  title: "Focused Aim",
  key: "focused-aim-38687",
  baseName: "Snipe",
  description:
    "Plant a masterfully aimed arrow in an enemy's vital spot, dealing |cffffff8359|r Physical Damage and applying the Sundered status effect.",
  icon: "/esoui/art/icons/ability_bow_001_b.dds",
  esoSkillId: 38687,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 527,
  createdAt: "2026-05-28T16:03:32.510Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.106915 MaxStat + 1.12261 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, 0.8s cooldown, R2 = 1)",
    "<<2>> = Sundered (Constant)",
  ],
} as const satisfies TemperSkill
