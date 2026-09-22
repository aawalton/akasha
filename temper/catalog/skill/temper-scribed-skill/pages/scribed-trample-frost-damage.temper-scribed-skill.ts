import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTrampleFrostDamage = {
  id: "019e6471-15d6-7e1f-b333-6ea99cbd6e76",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-trample-frost-damage",
  title: "Chilling Trample",
  key: "scribed-trample-frost-damage",
  baseName: "Trample",
  description: "Deals 2876 Frost Damage to all enemies.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220542,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/frost-damage",
  grimoireId: "temper-grimoire/trample",
} as const satisfies TemperScribedSkill
