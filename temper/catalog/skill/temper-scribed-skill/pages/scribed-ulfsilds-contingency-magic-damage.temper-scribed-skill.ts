import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedUlfsildsContingencyMagicDamage = {
  id: "019e6471-15ea-7cd5-8416-881cddc7705b",
  type: "page-type/temper-scribed-skill",
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
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "temper-grimoire/ulfsilds-contingency",
} as const satisfies TemperScribedSkill
