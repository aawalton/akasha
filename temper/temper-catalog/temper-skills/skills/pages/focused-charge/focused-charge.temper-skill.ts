import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const focusedCharge = {
  id: "019e6f53-a21f-7c03-b011-bbc4c94c98a8",
  pageTypeSlug: "temper-skill",
  slug: "focused-charge",
  title: "Focused Charge",
  key: "focused-charge",
  baseName: "Focused Charge",
  description:
    '"Charge with your divine lance to impale an enemy, dealing |cffffff4846|r Magic Damage while taunting them to attack you for |cffffff15|r seconds. If the enemy hit was casting, they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\\n\\nYou also gain Major Protection for |cffffff7|r seconds, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_templar_focused_charge.dds",
  esoSkillId: 22149,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
