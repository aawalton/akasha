import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ransack = {
  id: "019e6226-0109-7df7-9d2a-40433a9def21",
  pageTypeSlug: "temper-skill",
  slug: "ransack",
  title: "Ransack",
  key: "ransack",
  baseName: "Puncture",
  description:
    '"Thrust your weapon with disciplined precision at an enemy, dealing 1199 Physical Damage and taunting them to attack you for 15 seconds.\\n\\nAlso inflicts Major Breach on the enemy, reducing their Physical and Spell Resistance by 5948 for 15 seconds.\\n\\nYou also gain Minor Protection, reducing your damage taken by 5% for 15 seconds."',
  icon: "/esoui/art/icons/ability_1handed_002_a.dds",
  esoSkillId: 41487,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
