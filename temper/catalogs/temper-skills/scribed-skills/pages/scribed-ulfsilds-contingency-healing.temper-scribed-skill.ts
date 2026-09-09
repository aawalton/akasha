import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyHealing = {
  id: "019e6471-15e8-7187-aec1-1eefbdceea36",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-healing",
  title: "Healing Contingency",
  key: "scribed-ulfsilds-contingency-healing",
  baseName: "Ulfsild's Contingency",
  description:
    "Heals you and your allies for 2876 Health. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240149,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
