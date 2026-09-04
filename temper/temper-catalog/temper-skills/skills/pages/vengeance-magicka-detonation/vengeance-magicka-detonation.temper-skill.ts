import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMagickaDetonation = {
  id: "019e6f53-a93a-7664-bd33-256c8c511dea",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-magicka-detonation",
  title: "Vengeance Magicka Detonation",
  key: "vengeance-magicka-detonation",
  baseName: "Vengeance Magicka Detonation",
  description:
    '"Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff3562|r Magic Damage. You cannot recast this ability on a target you have affected.\\n\\nThis damage is increased by |cffffff100|r% for each additional Vengeance Magicka Detonation you have active, and cannot be dodged."',
  icon: "/esoui/art/icons/ability_ava_magicka_detonation.dds",
  esoSkillId: 244541,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-assault",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-assault",
} as const satisfies TemperSkill
