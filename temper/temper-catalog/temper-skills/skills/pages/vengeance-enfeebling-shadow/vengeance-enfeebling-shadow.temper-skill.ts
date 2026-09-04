import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEnfeeblingShadow = {
  id: "019e6f53-a8fe-74d9-8b69-dce2d83efeea",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-enfeebling-shadow",
  title: "Vengeance Enfeebling Shadow",
  key: "vengeance-enfeebling-shadow",
  baseName: "Vengeance Enfeebling Shadow",
  description:
    '"Infuse your weapon with sinister shadow and stab an enemy, dealing |cffffff5565|r Magic Damage and applying Major Maim to them for |cffffff6|r seconds, reducing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/achievement_thievesguild_040.dds",
  esoSkillId: 237700,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
