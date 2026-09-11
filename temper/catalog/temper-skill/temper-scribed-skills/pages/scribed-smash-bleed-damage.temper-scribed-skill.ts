import type { TemperScribedSkill } from "akasha/temper/catalog/temper-skill/temper-scribed-skills/temper-scribed-skill.page-type.types.ts"

export const scribedSmashBleedDamage = {
  id: "019e6471-15bb-7037-99ed-2f4abb2bfc44",
  type: "temper-scribed-skill",
  slug: "scribed-smash-bleed-damage",
  title: "Bloody Smash",
  key: "scribed-smash-bleed-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Bleed Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
