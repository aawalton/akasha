import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const illustriousHealing = {
  id: "019e6226-00fb-7c04-9938-19c43d3850cb",
  type: "page-type/temper-skill",
  slug: "illustrious-healing",
  title: "Illustrious Healing",
  key: "illustrious-healing",
  baseName: "Grand Healing",
  description:
    "Summon restoring spirits with your staff, healing you and your allies in the target area for 5486 Health over 15 seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_004b.dds",
  esoSkillId: 41255,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 660,
  createdAt: "2026-05-26T02:38:38.331Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870346 (Ultimate, ratio = 10.53, Heal, AOE, DOT, 12s duration, 1s tick, R2 = 0.999998)",
    "<<2>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
