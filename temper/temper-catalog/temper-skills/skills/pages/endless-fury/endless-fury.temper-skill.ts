import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const endlessFury = {
  id: "019e6245-a667-7a56-bd51-06f10793f5d0",
  pageTypeSlug: "temper-skill",
  slug: "endless-fury",
  title: "Endless Fury",
  key: "endless-fury",
  baseName: "Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing 871 Shock Damage.\\n\\nIf the enemy falls to or below 20% Health within 2 seconds of being struck, an explosion deals an additional 3195 Shock Damage to them and 696 Shock Damage to other enemies nearby.\\n\\nIf any enemy is killed within 5 seconds of being hit with this ability, you restore 4860 Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_endless_fury.dds",
  esoSkillId: 30343,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
