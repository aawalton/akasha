import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceImpulse = {
  id: "019e6f53-a929-7686-b299-dbc6122c9ea9",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/vengeance-weapon-destruction-staff",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
