import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifePoisonDamage = {
  id: "019e6471-15e1-7592-997b-0d4aeb5252ad",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-poison-damage",
  title: "Venomous Knife",
  key: "scribed-traveling-knife-poison-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and 1393 Poison Damage to enemies between you and them on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 217359,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "poison-damage",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
