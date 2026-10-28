import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashMagicDamage = {
  id: "019e6471-15be-7995-8e56-7484726d3fbd",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-magic-damage",
  title: "Magical Smash",
  key: "scribed-smash-magic-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Magic Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoAbilityId: 217179,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "temper-grimoire/smash",
  hashPlace: 1672,
  createdAt: "2026-05-26T13:19:53.278Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
