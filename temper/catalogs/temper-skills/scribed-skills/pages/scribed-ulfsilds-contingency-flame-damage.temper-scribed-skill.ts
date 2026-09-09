import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyFlameDamage = {
  id: "019e6471-15e6-745a-a59b-9a1eb8353c16",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-flame-damage",
  title: "Fiery Contingency",
  key: "scribed-ulfsilds-contingency-flame-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Flame Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "flame-damage",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
