import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const avidBoneyard117850 = {
  id: "019e6f53-9eda-7b63-967a-43e96e72d0f9",
  pageTypeSlug: "temper-skill",
  slug: "avid-boneyard-117850",
  title: "Avid Boneyard",
  key: "avid-boneyard-117850",
  baseName: "Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing |cffffff11110|r Frost Damage over |cffffff10|r seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by |cffffff5|r%.\\n\\nConsumes a corpse on cast to deal |cffffff30|r% more damage.\\n\\nYou or an ally in the area can activate the Grave Robber synergy, dealing |cffffff8261|r Frost Damage to enemies and healing for the damage done."',
  icon: "/esoui/art/icons/ability_necromancer_004_b.dds",
  esoSkillId: 117850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
