import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedUlfsildsContingencyKnockback = {
  id: "019e6471-15e9-7e6a-906e-d1ca3aa09f67",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-knockback",
  title: "Repelling Contingency",
  key: "scribed-ulfsilds-contingency-knockback",
  baseName: "Ulfsild's Contingency",
  description:
    "Knocks enemies back 8 meters. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240148,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/knockback",
  grimoireId: "temper-grimoire/ulfsilds-contingency",
} as const satisfies TemperScribedSkill
