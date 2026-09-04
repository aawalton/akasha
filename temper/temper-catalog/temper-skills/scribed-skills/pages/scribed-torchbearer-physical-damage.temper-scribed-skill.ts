import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerPhysicalDamage = {
  id: "019e6471-15d3-72b1-a018-b801c227b835",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-physical-damage",
  title: "Sundering Torch",
  key: "scribed-torchbearer-physical-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Physical Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217630,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "physical-damage",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
