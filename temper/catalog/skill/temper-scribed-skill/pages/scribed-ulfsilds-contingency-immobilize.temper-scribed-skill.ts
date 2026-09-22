import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedUlfsildsContingencyImmobilize = {
  id: "019e6471-15e8-7ffd-b9dc-cb84443835ba",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-immobilize",
  title: "Binding Contingency",
  key: "scribed-ulfsilds-contingency-immobilize",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 958 Magic Damage to enemies and immobilizes them for 4 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240148,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/immobilize",
  grimoireId: "temper-grimoire/ulfsilds-contingency",
} as const satisfies TemperScribedSkill
