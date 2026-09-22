import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTramplePhysicalDamage = {
  id: "019e6471-15d9-7bef-9f70-63075b632837",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-trample-physical-damage",
  title: "Sundering Trample",
  key: "scribed-trample-physical-damage",
  baseName: "Trample",
  description: "Deals 2876 Physical Damage to all enemies.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220541,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/physical-damage",
  grimoireId: "temper-grimoire/trample",
} as const satisfies TemperScribedSkill
