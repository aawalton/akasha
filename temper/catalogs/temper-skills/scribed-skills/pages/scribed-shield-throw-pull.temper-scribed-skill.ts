import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowPull = {
  id: "019e6471-15b9-7250-bfc8-4eba81eef89d",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-pull",
  title: "Leashing Throw",
  key: "scribed-shield-throw-pull",
  baseName: "Shield Throw",
  description:
    "Deals 1045 Physical Damage to an enemy, pulls them to you, and taunts them for 15 seconds if they are not already taunted. This attack cannot be reflected.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 221999,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "pull",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
