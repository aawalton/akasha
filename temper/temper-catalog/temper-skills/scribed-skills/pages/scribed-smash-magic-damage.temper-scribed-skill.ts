import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashMagicDamage = {
  id: "019e6471-15be-7995-8e56-7484726d3fbd",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-magic-damage",
  title: "Magical Smash",
  key: "scribed-smash-magic-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Magic Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217179,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
