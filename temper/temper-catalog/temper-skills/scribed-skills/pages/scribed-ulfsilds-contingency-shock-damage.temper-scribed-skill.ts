import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyShockDamage = {
  id: "019e6471-15eb-7cd9-9934-644683af8f97",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-shock-damage",
  title: "Shocking Contingency",
  key: "scribed-ulfsilds-contingency-shock-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Shock Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 222678,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "shock-damage",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
