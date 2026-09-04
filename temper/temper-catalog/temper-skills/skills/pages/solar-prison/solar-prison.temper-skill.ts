import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarPrison = {
  id: "019e6245-a737-7d1e-a3fa-f9f93ec02090",
  pageTypeSlug: "temper-skill",
  slug: "solar-prison",
  title: "Solar Prison",
  key: "solar-prison",
  baseName: "Nova",
  description:
    '"Call down a fragment of the sun, dealing 1199 Magic Damage every 1 second for 8 seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by 10%.\\n\\nAn ally near the fragment can activate the Gravity Crush synergy, dealing 5215 Magic Damage to all enemies in the area and stunning them for 5 seconds."',
  icon: "/esoui/art/icons/ability_templar_solar_prison.dds",
  esoSkillId: 24301,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
