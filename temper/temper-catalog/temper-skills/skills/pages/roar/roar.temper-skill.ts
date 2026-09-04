import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const roar = {
  id: "019e6f53-a663-79b1-a4f9-ab3b3e85ce8c",
  pageTypeSlug: "temper-skill",
  slug: "roar",
  title: "Roar",
  key: "roar",
  baseName: "Roar",
  description:
    '"Roar with bloodlust to fear nearby enemies for |cffffff4|r seconds and setting them Off Balance for |cffffff7|r seconds. Grants you a stack of Blood Hunger, which empowers Gnash and Claw Fury.\\n\\nUp to 12 nearby allies can activate the Feeding Frenzy synergy, which grants |cffffff6|r% damage done and Minor Force for |cffffff30|r seconds, increasing Critical Damage by |cffffff10|r%.\\n\\nWhile slotted you gain Major Prophecy and Savagery."',
  icon: "/esoui/art/icons/ability_werewolf_003.dds",
  esoSkillId: 32633,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
