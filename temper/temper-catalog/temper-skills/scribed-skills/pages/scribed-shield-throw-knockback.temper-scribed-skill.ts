import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowKnockback = {
  id: "019e6471-15b5-77bb-b55e-7dc36b952f33",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-knockback",
  title: "Repelling Throw",
  key: "scribed-shield-throw-knockback",
  baseName: "Shield Throw",
  description: "Deals 1045 Physical Damage to an enemy and knocks them back 8 meters.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 217061,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
