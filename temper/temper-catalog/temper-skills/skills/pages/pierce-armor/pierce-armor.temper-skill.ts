import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pierceArmor = {
  id: "019e6226-0102-744e-96a0-d0f1de0cdd1d",
  pageTypeSlug: "temper-skill",
  slug: "pierce-armor",
  title: "Pierce Armor",
  key: "pierce-armor",
  baseName: "Puncture",
  description:
    '"Thrust your weapon with disciplined precision at an enemy, dealing 1199 Physical Damage and taunting them to attack you for 15 seconds.\\n\\nAlso inflicts Minor Breach and Major Breach on the enemy, reducing their Physical Resistance and Spell Resistance by 2974 and 5948 for 15 seconds."',
  icon: "/esoui/art/icons/ability_1handed_002_b.dds",
  esoSkillId: 41497,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
