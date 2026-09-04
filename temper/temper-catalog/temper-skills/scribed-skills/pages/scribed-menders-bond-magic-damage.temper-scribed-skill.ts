import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondMagicDamage = {
  id: "019e6471-15b0-7bf4-85d7-2a2cbd4b66b5",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-magic-damage",
  title: "Magical Bond",
  key: "scribed-menders-bond-magic-damage",
  baseName: "Mender's Bond",
  description:
    "Grants the ally magical thorns which deal 214 Magic Damage to attackers, scaling off the ally's stats.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217285,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
