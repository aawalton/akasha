import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerGenerateUltimate = {
  id: "019e6471-15d0-74be-a29a-c1a5e3e16824",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-generate-ultimate",
  title: "Heroic Torch",
  key: "scribed-torchbearer-generate-ultimate",
  baseName: "Torchbearer",
  description:
    "Generates 1 Ultimate to you and your allies with each sweep. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 223292,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "generate-ultimate",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
