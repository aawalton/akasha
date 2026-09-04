import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const auroraJavelin26800 = {
  id: "019e6f53-9ed6-79d2-b463-2c54de4d876a",
  pageTypeSlug: "temper-skill",
  slug: "aurora-javelin-26800",
  title: "Aurora Javelin",
  key: "aurora-javelin-26800",
  baseName: "Piercing Javelin",
  description:
    '"Hurl your spear at an enemy with godlike strength, dealing |cffffff5004|r Magic Damage and knocking them back |cffffff8|r meters.\\n\\nThis ability ignores the enemy\'s Resistances and cannot be blocked.\\n\\nThe spear deals an additional |cffffff2|r% damage for every |cffffff1|r meter you are away from the target, up to a maximum of |cffffff40|r%."',
  icon: "/esoui/art/icons/ability_templar_ripping_spear.dds",
  esoSkillId: 26800,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
