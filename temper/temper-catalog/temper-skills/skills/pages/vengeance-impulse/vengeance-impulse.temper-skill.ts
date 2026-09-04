import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceImpulse = {
  id: "019e6f53-a929-7686-b299-dbc6122c9ea9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-impulse",
  title: "Vengeance Impulse",
  key: "vengeance-impulse",
  baseName: "Vengeance Impulse",
  description:
    '"Release a surge of elemental energy, dealing |cffffff8820|r Magic Damage to up to 3 nearby enemies.\\n\\nFire Impulse converts some of the initial hit into damage over time.\\n\\nFrost Impulse costs more but provides Minor Protection.\\n\\nShock Impulse deals less damage but has a chance to deal increased damage."',
  icon: "/esoui/art/icons/ability_destructionstaff_008.dds",
  esoSkillId: 241454,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
