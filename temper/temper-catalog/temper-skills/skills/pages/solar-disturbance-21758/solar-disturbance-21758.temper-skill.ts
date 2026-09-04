import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarDisturbance21758 = {
  id: "019e6f53-a74b-7e4e-a90f-c0b07a388516",
  pageTypeSlug: "temper-skill",
  slug: "solar-disturbance-21758",
  title: "Solar Disturbance",
  key: "solar-disturbance-21758",
  baseName: "Nova",
  description:
    '"Call down a fragment of the sun, dealing |cffffff4038|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and applying Major Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff10|r%.\\n\\nAn ally near the fragment can activate the Supernova synergy, dealing |cffffff9576|r Magic Damage to all enemies in the area and stunning them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_templar_solar_disturbance.dds",
  esoSkillId: 21758,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
