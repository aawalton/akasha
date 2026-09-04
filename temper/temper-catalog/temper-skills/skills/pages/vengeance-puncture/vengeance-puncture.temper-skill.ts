import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePuncture = {
  id: "019e6f53-a955-7acf-9132-41586df51885",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-puncture",
  title: "Vengeance Puncture",
  key: "vengeance-puncture",
  baseName: "Vengeance Puncture",
  description:
    '"Thrust your weapon with disciplined precision at an enemy, dealing |cffffff5565|r Physical Damage.\\n\\nAlso inflicts Major Breach on the enemy, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_002.dds",
  esoSkillId: 240547,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill
