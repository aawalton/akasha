import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const topplingCharge = {
  id: "019e6245-a754-79eb-99b6-c5da083d2381",
  pageTypeSlug: "temper-skill",
  slug: "toppling-charge",
  title: "Toppling Charge",
  key: "toppling-charge",
  baseName: "Focused Charge",
  description:
    '"Charge with your divine lance to impale an enemy, dealing 1393 Magic Damage while taunting them to attack you for 15 seconds. The enemy hit is stunned for 3 seconds, set Off Balance, and if they were casting, they are interrupted.\\n\\nYou also gain Major Protection for 7 seconds, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_templar_toppling_charge.dds",
  esoSkillId: 23870,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
