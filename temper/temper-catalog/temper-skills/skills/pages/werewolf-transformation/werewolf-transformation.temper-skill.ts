import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const werewolfTransformation = {
  id: "019e6f53-a9e6-7d95-b33c-2d80ea034466",
  pageTypeSlug: "temper-skill",
  slug: "werewolf-transformation",
  title: "Werewolf Transformation",
  key: "werewolf-transformation",
  baseName: "Werewolf Transformation",
  description:
    '"Transform into a beast, fearing nearby enemies for |cffffff3|r seconds.\\n\\nWhile transformed and in combat, abilities generate |cffffff15|r Fury. When you have |cffffff1000|r, this ability becomes Rampage, which increases your damage done by |cffffff15|r%, Movement Speed by |cffffff20|r%, and removes the cost of all Werewolf abilities for |cffffff20|r seconds. \\n\\nWhile slotted, your Stamina Recovery is increased by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_werewolf_001.dds",
  esoSkillId: 32455,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-werewolf",
  skillType: "ultimate",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
