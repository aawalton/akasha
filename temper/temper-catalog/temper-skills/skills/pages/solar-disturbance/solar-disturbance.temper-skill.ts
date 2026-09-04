import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarDisturbance = {
  id: "019e6245-a736-7c18-94f2-a423e9f51060",
  pageTypeSlug: "temper-skill",
  slug: "solar-disturbance",
  title: "Solar Disturbance",
  key: "solar-disturbance",
  baseName: "Nova",
  description:
    '"Call down a fragment of the sun, dealing 1161 Magic Damage every 1 second for 8 seconds to enemies in the area and applying Major Maim to them for 10 seconds, reducing their damage done by 10%.\\n\\nAn ally near the fragment can activate the Supernova synergy, dealing 2607 Magic Damage to all enemies in the area and stunning them for 3 seconds."',
  icon: "/esoui/art/icons/ability_templar_solar_disturbance.dds",
  esoSkillId: 24320,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
