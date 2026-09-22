import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedShieldThrowPhysicalDamage = {
  id: "019e6471-15b8-733c-8cc1-104429b13d0d",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-shield-throw-physical-damage",
  title: "Sundering Throw",
  key: "scribed-shield-throw-physical-damage",
  baseName: "Shield Throw",
  description: "Deals 2091 Physical Damage to an enemy.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 216973,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/physical-damage",
  grimoireId: "temper-grimoire/shield-throw",
} as const satisfies TemperScribedSkill
