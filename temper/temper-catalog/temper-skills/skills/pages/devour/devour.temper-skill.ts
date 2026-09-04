import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const devour = {
  id: "019e6251-4ca6-7e14-911a-f8adbad41d36",
  pageTypeSlug: "temper-skill",
  slug: "devour",
  title: "Insatiable Hunger",
  key: "devour",
  baseName: "Insatiable Hunger",
  description:
    '"Hunger gnaws at you. Like Storihbeg, shape it into a brutal weapon.\\n\\nGain the ability to devour corpses, for up to |cffffff4|r seconds per corpse. Each second devouring you heal for |cffffff3664|r Health, based off your Max Health, and restore |cffffff15|r Ultimate.\\n\\nIf you are a Werewolf Berserker, each tick activates Fury generation."',
  icon: "/esoui/art/icons/ability_werewolf_007.dds",
  esoSkillId: 32634,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-werewolf",
  skillType: "passive",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
