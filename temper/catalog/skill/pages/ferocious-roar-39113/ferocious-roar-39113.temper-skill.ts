import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ferociousRoar39113 = {
  id: "019e6f53-a1f5-79d2-805a-be052cc772c2",
  type: "page-type/temper-skill",
  slug: "ferocious-roar-39113",
  title: "Ferocious Roar",
  key: "ferocious-roar-39113",
  baseName: "Roar",
  description:
    '"Roar with bloodlust to fear nearby enemies for |cffffff4|r seconds and setting them Off Balance for |cffffff7|r seconds. Grants two stacks of Blood Hunger, which empowers Gnash and Claw Fury.\\n\\nYou and up to 11 nearby allies gain Major Courage for |cffffff20|r seconds and can activate the Feeding Frenzy synergy, which grants |cffffff6|r% damage done and Minor Force for |cffffff30|r seconds.\\n\\nWhile slotted you gain Major Prophecy and Savagery."',
  icon: "/esoui/art/icons/ability_werewolf_003_b.dds",
  esoSkillId: 39113,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
