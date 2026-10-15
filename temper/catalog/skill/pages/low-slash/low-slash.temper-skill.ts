import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lowSlash = {
  id: "019e6f53-a422-772f-9314-596e3468780a",
  type: "page-type/temper-skill",
  slug: "low-slash",
  title: "Low Slash",
  key: "low-slash",
  baseName: "Low Slash",
  description:
    "Surprise an enemy with a deep lunge, dealing |cffffff4846|r Physical Damage and afflicting them with Minor Maim, reducing their damage done by |cffffff5|r% for |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_001.dds",
  esoSkillId: 28304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 772,
  createdAt: "2026-05-28T16:03:33.026Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
