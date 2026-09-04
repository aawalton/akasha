import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifeMagicDamage = {
  id: "019e6471-15de-774d-9e18-6de0b4540e13",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-magic-damage",
  title: "Magic Knife",
  key: "scribed-traveling-knife-magic-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Magic Damage to an enemy and 1393 Magic Damage to enemies between you and them on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 217473,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
