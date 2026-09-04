import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const nova = {
  id: "019e6f53-a4c6-760c-9fb2-913f087cc408",
  pageTypeSlug: "temper-skill",
  slug: "nova",
  title: "Nova",
  key: "nova",
  baseName: "Nova",
  description:
    '"Call down a fragment of the sun, dealing |cffffff4036|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by |cffffff10|r%.\\n\\nAn ally near the fragment can activate the Supernova synergy, dealing |cffffff9576|r Magic Damage to all enemies in the area and stunning them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_templar_nova.dds",
  esoSkillId: 21752,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
