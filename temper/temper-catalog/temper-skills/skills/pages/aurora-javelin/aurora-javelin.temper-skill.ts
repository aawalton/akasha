import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const auroraJavelin = {
  id: "019e6245-a5ef-7a5a-955a-d09911ea2dbe",
  pageTypeSlug: "temper-skill",
  slug: "aurora-javelin",
  title: "Aurora Javelin",
  key: "aurora-javelin",
  baseName: "Piercing Javelin",
  description:
    '"Hurl your spear at an enemy with godlike strength, dealing 1438 Magic Damage and knocking them back 8 meters.\\n\\nThis ability ignores the enemy\'s Resistances and cannot be blocked.\\n\\nThe spear deals an additional 2% damage for every 1 meter you are away from the target, up to a maximum of 40%."',
  icon: "/esoui/art/icons/ability_templar_ripping_spear.dds",
  esoSkillId: 26983,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
