import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashKnockback = {
  id: "019e6471-15bd-7b4c-9df9-0944efb9528d",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-knockback",
  title: "Repelling Smash",
  key: "scribed-smash-knockback",
  baseName: "Smash",
  description:
    "Deals 1001 Physical Damage to enemies and knocks them back 8 meters and stuns them for 1.8 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 219972,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
