import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifePhysicalDamage = {
  id: "019e6471-15e0-7682-9382-7a0992385d03",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-physical-damage",
  title: "Sundering Knife",
  key: "scribed-traveling-knife-physical-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and 1393 Physical Damage to enemies between you and them on return.",
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
  focusScriptId: "physical-damage",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
