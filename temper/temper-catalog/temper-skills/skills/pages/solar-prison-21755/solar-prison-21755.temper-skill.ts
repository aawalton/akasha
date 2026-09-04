import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarPrison21755 = {
  id: "019e6f53-a752-702e-aa98-1eec5f64203a",
  pageTypeSlug: "temper-skill",
  slug: "solar-prison-21755",
  title: "Solar Prison",
  key: "solar-prison-21755",
  baseName: "Nova",
  description:
    '"Call down a fragment of the sun, dealing |cffffff4170|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by |cffffff10|r%.\\n\\nAn ally near the fragment can activate the Gravity Crush synergy, dealing |cffffff19152|r Magic Damage to all enemies in the area and stunning them for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_templar_solar_prison.dds",
  esoSkillId: 21755,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
