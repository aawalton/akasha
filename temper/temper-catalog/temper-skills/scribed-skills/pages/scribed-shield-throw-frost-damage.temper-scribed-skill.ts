import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowFrostDamage = {
  id: "019e6471-15b3-78b3-8b93-79ca196a7080",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-frost-damage",
  title: "Chilling Throw",
  key: "scribed-shield-throw-frost-damage",
  baseName: "Shield Throw",
  description: "Deals 2091 Frost Damage to an enemy.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 217808,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
