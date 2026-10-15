import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const invasion38405 = {
  id: "019e6f53-a390-7c0a-82a6-3e389b0870a6",
  type: "page-type/temper-skill",
  slug: "invasion-38405",
  title: "Invasion",
  key: "invasion-38405",
  baseName: "Shield Charge",
  description:
    "Rush an enemy and ram them, dealing |cffffff4845|r Physical Damage and stunning them for |cffffff4|r seconds.\n\nStuns up to |cffffff50|r% longer based on the distance traveled.",
  icon: "/esoui/art/icons/ability_1handed_003_b.dds",
  esoSkillId: 38405,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 701,
  createdAt: "2026-05-28T16:03:32.880Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 0.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
