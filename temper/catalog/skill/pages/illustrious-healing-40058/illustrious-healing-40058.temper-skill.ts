import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const illustriousHealing40058 = {
  id: "019e6f53-a352-78b8-b507-f05d8f90802a",
  type: "page-type/temper-skill",
  slug: "illustrious-healing-40058",
  title: "Illustrious Healing",
  key: "illustrious-healing-40058",
  baseName: "Grand Healing",
  description:
    "Summon restoring spirits with your staff, healing you and your allies in the target area for |cffffff21248|r Health over |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_004b.dds",
  esoSkillId: 40058,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 661,
  createdAt: "2026-05-28T16:03:32.818Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870346 (Ultimate, ratio = 10.53, Heal, AOE, DOT, 12s duration, 1s tick, R2 = 0.999998)",
    "<<2>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
