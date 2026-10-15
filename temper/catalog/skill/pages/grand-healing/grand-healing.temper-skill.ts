import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const grandHealing = {
  id: "019e6f53-a29b-7823-b3c7-60e26907800a",
  type: "page-type/temper-skill",
  slug: "grand-healing",
  title: "Grand Healing",
  key: "grand-healing",
  baseName: "Grand Healing",
  description:
    "Summon restoring spirits with your staff, healing you and your allies in the target area for |cffffff14597|r Health over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_004.dds",
  esoSkillId: 28385,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 573,
  createdAt: "2026-05-28T16:03:32.635Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0182227 MaxStat + 0.19082 MaxPower - 1.34458 (Ultimate, ratio = 10.47, Heal, AOE, DOT, 10s duration, 1s tick, R2 = 0.999996)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
