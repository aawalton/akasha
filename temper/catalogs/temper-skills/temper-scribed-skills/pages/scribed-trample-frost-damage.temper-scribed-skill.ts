import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleFrostDamage = {
  id: "019e6471-15d6-7e1f-b333-6ea99cbd6e76",
  pageTypeSlug: "temper-scribed-skill",
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
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
