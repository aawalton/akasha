import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const endlessFury19109 = {
  id: "019e6f53-a16d-734c-b412-4d37fa345d1b",
  pageTypeSlug: "temper-skill",
  slug: "endless-fury-19109",
  title: "Endless Fury",
  key: "endless-fury-19109",
  baseName: "Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing |cffffff3028|r Shock Damage.\\n\\nIf the enemy falls to or below |cffffff20|r% Health within |cffffff2|r seconds of being struck, an explosion deals an additional |cffffff11107|r Shock Damage to them and |cffffff2559|r Shock Damage to other enemies nearby.\\n\\nIf any enemy is killed within |cffffff5|r seconds of being hit with this ability, you restore |cffffff4860|r Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_endless_fury.dds",
  esoSkillId: 19109,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
