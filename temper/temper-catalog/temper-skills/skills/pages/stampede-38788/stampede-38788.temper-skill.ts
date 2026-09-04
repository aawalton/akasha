import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stampede38788 = {
  id: "019e6f53-a7b2-74a7-bbe8-88ce00e79034",
  pageTypeSlug: "temper-skill",
  slug: "stampede-38788",
  title: "Stampede",
  key: "stampede-38788",
  baseName: "Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing |cffffff5120|r Physical Damage to them and all nearby enemies. This attack is always a Critical Strike.\\n\\nAfter reaching your target, you sunder the ground beneath you, dealing |cffffff1111|r Physical Damage to all enemies in the area every |cffffff1|r second for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_003_a.dds",
  esoSkillId: 38788,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
