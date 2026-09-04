import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const topplingCharge15540 = {
  id: "019e6f53-a84a-7e0f-8147-c1445fb4d5b7",
  pageTypeSlug: "temper-skill",
  slug: "toppling-charge-15540",
  title: "Toppling Charge",
  key: "toppling-charge-15540",
  baseName: "Focused Charge",
  description:
    '"Charge with your divine lance to impale an enemy, dealing |cffffff4845|r Magic Damage while taunting them to attack you for |cffffff15|r seconds. The enemy hit is stunned for |cffffff3|r seconds, set Off Balance, and if they were casting, they are interrupted.\\n\\nYou also gain Major Protection for |cffffff7|r seconds, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_templar_toppling_charge.dds",
  esoSkillId: 15540,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
