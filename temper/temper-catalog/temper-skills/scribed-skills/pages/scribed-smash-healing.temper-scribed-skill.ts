import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashHealing = {
  id: "019e6471-15bc-7c56-8837-3ad046c333b7",
  pageTypeSlug: "temper-scribed-skill",
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
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
