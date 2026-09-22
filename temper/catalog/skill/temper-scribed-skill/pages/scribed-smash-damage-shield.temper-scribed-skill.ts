import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashDamageShield = {
  id: "019e6471-15bb-7e37-aadc-caf02c2a60d8",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-damage-shield",
  title: "Warding Smash",
  key: "scribed-smash-damage-shield",
  baseName: "Smash",
  description:
    "Grants you and your allies a damage shield that absorbs 3006 damage for 6 seconds. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217820,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/damage-shield",
  grimoireId: "temper-grimoire/smash",
} as const satisfies TemperScribedSkill
