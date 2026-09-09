import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyBleedDamage = {
  id: "019e6471-15e4-74a9-9285-79e8dc06b17b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-bleed-damage",
  title: "Bloody Contingency",
  key: "scribed-ulfsilds-contingency-bleed-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Bleed Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "bleed-damage",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
