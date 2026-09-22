import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTorchbearerFrostDamage = {
  id: "019e6471-15cf-762c-a2cb-b3a2210b379d",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-torchbearer-frost-damage",
  title: "Chilling Torch",
  key: "scribed-torchbearer-frost-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Frost Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217637,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/frost-damage",
  grimoireId: "temper-grimoire/torchbearer",
} as const satisfies TemperScribedSkill
