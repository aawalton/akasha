import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deafeningRoar39114 = {
  id: "019e6f53-a095-7769-9564-2537b4200857",
  pageTypeSlug: "temper-skill",
  slug: "deafening-roar-39114",
  title: "Deafening Roar",
  key: "deafening-roar-39114",
  baseName: "Roar",
  description:
    '"Roar with bloodlust to fear nearby enemies for |cffffff4|r seconds, setting them Off Balance for |cffffff7|r seconds, and applying Major Cowardice and Maim for |cffffff14|r seconds. Grants you a stack of Blood Hunger.\\n\\nUp to 12 nearby allies can activate the Feeding Frenzy synergy, which grants |cffffff6|r% damage done and Minor Force for |cffffff30|r seconds.\\n\\nWhile slotted you gain Major Evasion and Minor Protection. Selecting this morph causes your Gnash to taunt enemies if cast while Bracing."',
  icon: "/esoui/art/icons/ability_werewolf_003_a.dds",
  esoSkillId: 39114,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
