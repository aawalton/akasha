import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowMultiTarget = {
  id: "019e6471-15b7-751c-ae3d-4d690f7d56be",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-multi-target",
  title: "Shattering Throw",
  key: "scribed-shield-throw-multi-target",
  baseName: "Shield Throw",
  description:
    "Deals 1045 Physical Damage to an enemy and bounces up to 2 times to random nearby enemies, dealing 1393 Physical Damage and 1742 Physical Damage.",
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
  focusScriptId: "multi-target",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
