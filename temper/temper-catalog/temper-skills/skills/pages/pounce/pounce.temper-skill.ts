import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pounce = {
  id: "019e6f53-a51d-73d7-8943-d55d98631c6b",
  pageTypeSlug: "temper-skill",
  slug: "pounce",
  title: "Pounce",
  key: "pounce",
  baseName: "Pounce",
  description:
    '"Pounce on an enemy with primal fury, dealing |cffffff4901|r Bleed Damage and applying the Hemorrhaging status effect.\\n\\nWhen you are |cffffff7|r meters or closer this ability becomes Carnage, which causes you to rip into an enemy and deal |cffffff4893|r Bleed Damage over |cffffff12|r seconds, dealing up to |cffffff450|r% more damage to enemies under |cffffff100|r% Health."',
  icon: "/esoui/art/icons/u50_ability_werewolf_pounce.dds",
  esoSkillId: 32632,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
