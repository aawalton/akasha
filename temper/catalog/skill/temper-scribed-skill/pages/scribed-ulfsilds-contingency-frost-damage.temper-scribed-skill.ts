import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedUlfsildsContingencyFrostDamage = {
  id: "019e6471-15e7-7302-814e-e56897a576db",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-frost-damage",
  title: "Chilling Contingency",
  key: "scribed-ulfsilds-contingency-frost-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Frost Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 222678,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/frost-damage",
  grimoireId: "temper-grimoire/ulfsilds-contingency",
} as const satisfies TemperScribedSkill
