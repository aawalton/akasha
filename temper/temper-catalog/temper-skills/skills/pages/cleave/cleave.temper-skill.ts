import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cleave = {
  id: "019e6f53-9ff8-7a2a-a7f2-24ec39b7e91a",
  pageTypeSlug: "temper-skill",
  slug: "cleave",
  title: "Cleave",
  key: "cleave",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing |cffffff6400|r Physical Damage to enemies in front of you.\\n\\nYou also gain a damage shield that absorbs |cffffff6177|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_002.dds",
  esoSkillId: 20919,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
