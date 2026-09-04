import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const explosiveCharge = {
  id: "019e6245-a67d-701c-9c91-8f2baf789c91",
  pageTypeSlug: "temper-skill",
  slug: "explosive-charge",
  title: "Explosive Charge",
  key: "explosive-charge",
  baseName: "Focused Charge",
  description:
    '"Charge with your divine lance to impale all enemies in the area, dealing 1799 Magic Damage while taunting the first enemy hit to attack you for 15 seconds. Any enemy hit that was casting is interrupted, set Off Balance, and stunned for 3 seconds.\\n\\n You also gain Major Protection for 15 seconds, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_templar_double_tipped_charge.dds",
  esoSkillId: 23726,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
