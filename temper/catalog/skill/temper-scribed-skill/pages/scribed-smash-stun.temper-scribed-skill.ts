import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashStun = {
  id: "019e6471-15c1-74ce-9dac-b00e270a4b78",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-stun",
  title: "Dazing Smash",
  key: "scribed-smash-stun",
  baseName: "Smash",
  description:
    "Deals 1001 Physical Damage to enemies and fears them for 3 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 219972,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/stun",
  grimoireId: "temper-grimoire/smash",
} as const satisfies TemperScribedSkill
