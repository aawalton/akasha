import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaDetonation = {
  id: "019e6f53-a43c-75f8-9413-20a3a0895069",
  pageTypeSlug: "temper-skill",
  slug: "magicka-detonation",
  title: "Magicka Detonation",
  key: "magicka-detonation",
  baseName: "Magicka Detonation",
  description:
    '"Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff1599|r Magic Damage to all enemies in the area.\\n\\nEach enemy within the bomb\'s radius increases the damage by |cffffff100|r%, including the original target."',
  icon: "/esoui/art/icons/ability_ava_magicka_detonation.dds",
  esoSkillId: 61487,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 7,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
