import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTrampleDiseaseDamage = {
  id: "019e6471-15d5-7012-8647-c544504cde54",
  type: "page-type/temper-scribed-skill",
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
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/disease-damage",
  grimoireId: "temper-grimoire/trample",
} as const satisfies TemperScribedSkill
