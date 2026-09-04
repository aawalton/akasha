import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const traumaticBurns = {
  id: "019e6f53-a85e-7d81-a520-7a6e544b9d95",
  pageTypeSlug: "temper-skill",
  slug: "traumatic-burns",
  title: "Traumatic Burns",
  key: "traumatic-burns",
  baseName: "Traumatic Burns",
  description:
    '"Fire cares not for love, or coin, or creed. It consumes.\\n\\nDealing direct damage with an Ardent Flame ability causes the target to take |cffffff5|r% increased Flame Damage and reduces their Movement Speed by |cffffff15|r% for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_023.dds",
  esoSkillId: 29430,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "passive",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
