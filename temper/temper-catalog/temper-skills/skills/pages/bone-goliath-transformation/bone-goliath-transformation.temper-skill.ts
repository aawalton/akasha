import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boneGoliathTransformation = {
  id: "019e6f53-9f70-7487-a540-436302ac6103",
  pageTypeSlug: "temper-skill",
  slug: "bone-goliath-transformation",
  title: "Bone Goliath Transformation",
  key: "bone-goliath-transformation",
  baseName: "Bone Goliath Transformation",
  description:
    '"Become a horrific Bone Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \\n\\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. This ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_012.dds",
  esoSkillId: 115001,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
