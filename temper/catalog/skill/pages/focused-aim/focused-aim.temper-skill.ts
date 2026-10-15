import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const focusedAim = {
  id: "019e6226-00f1-7f3d-91e2-9f2e24b43867",
  type: "page-type/temper-skill",
  slug: "focused-aim",
  title: "Focused Aim",
  key: "focused-aim",
  baseName: "Snipe",
  description:
    "Plant a masterfully aimed arrow in an enemy's vital spot, dealing 2404 Physical Damage and applying the Sundered status effect.",
  icon: "/esoui/art/icons/ability_bow_001_b.dds",
  esoSkillId: 40907,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 526,
  createdAt: "2026-05-26T02:38:38.321Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.106915 MaxStat + 1.12261 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, 0.8s cooldown, R2 = 1)",
    "<<2>> = Sundered (Constant)",
  ],
} as const satisfies TemperSkill
