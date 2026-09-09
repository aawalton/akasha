import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyMagicDamage = {
  id: "019e6471-15ea-7cd5-8416-881cddc7705b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-magic-damage",
  title: "Magical Contingency",
  key: "scribed-ulfsilds-contingency-magic-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Magic Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "magic-damage",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
