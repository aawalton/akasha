import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashTaunt = {
  id: "019e6471-15c2-740a-b681-09445b01a07b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-taunt",
  title: "Goading Smash",
  key: "scribed-smash-taunt",
  baseName: "Smash",
  description:
    "Deals 1001 Physical Damage to enemies and taunts the initial target to attack you for 15 seconds. Now requires a target to cast and beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 227609,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "taunt",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
