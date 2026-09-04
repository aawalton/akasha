import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unnervingBoneyard = {
  id: "019e6245-a75b-7046-bc8f-84d17f203849",
  pageTypeSlug: "temper-skill",
  slug: "unnerving-boneyard",
  title: "Unnerving Boneyard",
  key: "unnerving-boneyard",
  baseName: "Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing 3190 Frost Damage over 10 seconds to enemies inside and applying Major Breach and Minor Vulnerability, reducing Physical and Spell Resistance by 5948 and increasing damage taken by 5% for 4.1 seconds each tick.\\n\\nConsumes a corpse on cast to deal 30% more damage.\\n\\nAn ally in the area can activate the Grave Robber synergy, dealing 2249 Frost Damage to nearby enemies and healing for the damage done."',
  icon: "/esoui/art/icons/ability_necromancer_004_a.dds",
  esoSkillId: 40117805,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
