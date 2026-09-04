import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pummelingGoliath118664 = {
  id: "019e6f53-a55d-7d50-b278-b5925572568b",
  pageTypeSlug: "temper-skill",
  slug: "pummeling-goliath-118664",
  title: "Pummeling Goliath",
  key: "pummeling-goliath-118664",
  baseName: "Bone Goliath Transformation",
  description:
    '"Become a destructive Pummeling Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \\n\\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. This ability scales off your Max Health. \\n\\nYour Bash attacks can hit multiple targets in front of you and deal |cffffff6746|r Physical Damage."',
  icon: "/esoui/art/icons/ability_necromancer_012_a.dds",
  esoSkillId: 118664,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
