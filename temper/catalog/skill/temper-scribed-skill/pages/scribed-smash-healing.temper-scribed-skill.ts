import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashHealing = {
  id: "019e6471-15bc-7c56-8837-3ad046c333b7",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-healing",
  title: "Healing Smash",
  key: "scribed-smash-healing",
  baseName: "Smash",
  description:
    "Heals you and your allies for 3006 Health. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217184,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/healing",
  grimoireId: "temper-grimoire/smash",
} as const satisfies TemperScribedSkill
