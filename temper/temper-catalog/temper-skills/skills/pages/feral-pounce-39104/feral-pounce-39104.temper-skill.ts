import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const feralPounce39104 = {
  id: "019e6f53-a1ee-799f-a5da-d3f3d9d648ae",
  pageTypeSlug: "temper-skill",
  slug: "feral-pounce-39104",
  title: "Feral Pounce",
  key: "feral-pounce-39104",
  baseName: "Pounce",
  description:
    '"Pounce on an enemy with primal fury, dealing |cffffff4902|r Bleed Damage and applying the Hemorrhaging status effect.\\n\\nWhen you are |cffffff7|r meters or closer this ability becomes Feral Carnage, which causes you to rip into an enemy and deal |cffffff4900|r Bleed Damage over |cffffff12|r seconds, dealing up to |cffffff450|r% more damage to enemies under |cffffff100|r% Health.\\n\\nDealing damage with either ability restores |cffffff195|r Stamina and triggers Fury generation."',
  icon: "/esoui/art/icons/u50_ability_werewolf_feral_pounce.dds",
  esoSkillId: 39104,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
