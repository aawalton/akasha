import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pierceArmor38250 = {
  id: "019e6f53-a500-74f6-a923-f2ed42a011a2",
  pageTypeSlug: "temper-skill",
  slug: "pierce-armor-38250",
  title: "Pierce Armor",
  key: "pierce-armor-38250",
  baseName: "Puncture",
  description:
    '"Thrust your weapon with disciplined precision at an enemy, dealing |cffffff4170|r Physical Damage and taunting them to attack you for |cffffff15|r seconds.\\n\\nAlso inflicts Minor Breach and Major Breach on the enemy, reducing their Physical Resistance and Spell Resistance by |cffffff2974|r and |cffffff5948|r for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_002_b.dds",
  esoSkillId: 38250,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
