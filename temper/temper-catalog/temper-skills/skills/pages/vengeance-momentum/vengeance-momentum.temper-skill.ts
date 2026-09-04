import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMomentum = {
  id: "019e6f53-a941-7a47-953a-a797d9322487",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-momentum",
  title: "Vengeance Momentum",
  key: "vengeance-momentum",
  baseName: "Vengeance Momentum",
  description:
    '"Focus your strength and resolve to gain Minor Force, increasing your Critical Damage by |cffffff10|r%, as well as gaining Minor Endurance, increasing your Stamina Recovery by |cffffff15|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_005.dds",
  esoSkillId: 240483,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "active",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
