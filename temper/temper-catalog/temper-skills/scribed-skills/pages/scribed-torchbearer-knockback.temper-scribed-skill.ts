import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerKnockback = {
  id: "019e6471-15d2-723a-8f9d-d9a283ec54e4",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-knockback",
  title: "Repelling Torch",
  key: "scribed-torchbearer-knockback",
  baseName: "Torchbearer",
  description:
    "Knocks enemies back 5 meters with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217633,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
