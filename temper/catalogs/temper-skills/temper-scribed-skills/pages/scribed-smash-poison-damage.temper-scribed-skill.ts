import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashPoisonDamage = {
  id: "019e6471-15c0-76b4-94b8-7ac94fe777e0",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-poison-damage",
  title: "Venomous Smash",
  key: "scribed-smash-poison-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Poison Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "poison-damage",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
