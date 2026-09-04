import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneyard = {
  id: "019e6f53-9f76-76be-bdb1-ab8d323ed670",
  pageTypeSlug: "temper-skill",
  slug: "boneyard",
  title: "Boneyard",
  key: "boneyard",
  baseName: "Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing |cffffff10747|r Frost Damage over |cffffff10|r seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by |cffffff5|r%.\\n\\nConsumes a corpse on cast to deal |cffffff30|r% more damage.\\n\\nAn ally in the area can activate the Grave Robber synergy, dealing |cffffff8261|r Frost Damage to nearby enemies and healing for the damage done."',
  icon: "/esoui/art/icons/ability_necromancer_004.dds",
  esoSkillId: 115252,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
