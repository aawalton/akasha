import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoneGoliathTransformation = {
  id: "019e6f53-a8c9-71da-8f8b-19cd8e9af490",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bone-goliath-transformation",
  title: "Vengeance Bone Goliath Transformation",
  key: "vengeance-bone-goliath-transformation",
  baseName: "Vengeance Bone Goliath Transformation",
  description:
    '"Become a horrific Bone Goliath, increasing your Max Health by |cffffff70000|r for |cffffff15|r seconds and immediately restoring |cffffff70000|r Health."',
  icon: "/esoui/art/icons/ability_necromancer_012.dds",
  esoSkillId: 238236,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
