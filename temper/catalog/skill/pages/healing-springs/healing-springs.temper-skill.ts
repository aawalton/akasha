import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingSprings = {
  id: "019e6226-00f8-7710-bc11-3e0c4033a2f0",
  type: "page-type/temper-skill",
  slug: "healing-springs",
  title: "Healing Springs",
  key: "healing-springs",
  baseName: "Grand Healing",
  description:
    "Summon restoring spirits with your staff, healing you and your allies in the target area for 4642 Health over 10 seconds. \n\nIncreases your Magicka Recovery by 15 for each target affected, stacking up to 20 times.",
  icon: "/esoui/art/icons/ability_restorationstaff_004a.dds",
  esoSkillId: 41265,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 605,
  createdAt: "2026-05-26T02:38:38.328Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Heal, AOE, DOT, 10s duration, 1s tick, R2 = 0.999998)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 15 (Constant)",
  ],
} as const satisfies TemperSkill
