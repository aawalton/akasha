import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTrampleKnockback = {
  id: "019e6471-15d7-7d6b-9098-2ae2f6808979",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-trample-knockback",
  title: "Repelling Trample",
  key: "scribed-trample-knockback",
  baseName: "Trample",
  description: "Deals 1438 Physical Damage to all enemies and knocks them back 8 meters.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 217663,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/knockback",
  grimoireId: "temper-grimoire/trample",
} as const satisfies TemperScribedSkill
