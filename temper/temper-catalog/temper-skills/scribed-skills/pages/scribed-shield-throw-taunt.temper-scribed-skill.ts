import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowTaunt = {
  id: "019e6471-15ba-71eb-b259-a3fcda755d40",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-taunt",
  title: "Goading Throw",
  key: "scribed-shield-throw-taunt",
  baseName: "Shield Throw",
  description: "Deals 1045 Physical Damage to an enemy and taunts them for 15 seconds.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 222966,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "taunt",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
