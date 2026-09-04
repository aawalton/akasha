import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleDiseaseDamage = {
  id: "019e6471-15d5-7012-8647-c544504cde54",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-disease-damage",
  title: "Pestilent Trample",
  key: "scribed-trample-disease-damage",
  baseName: "Trample",
  description: "Deals 2876 Disease Damage to all enemies.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220541,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "disease-damage",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
