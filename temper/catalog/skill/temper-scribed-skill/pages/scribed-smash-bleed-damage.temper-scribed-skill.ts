import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashBleedDamage = {
  id: "019e6471-15bb-7037-99ed-2f4abb2bfc44",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-bleed-damage",
  title: "Bloody Smash",
  key: "scribed-smash-bleed-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Bleed Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoAbilityId: 217178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/bleed-damage",
  grimoireId: "temper-grimoire/smash",
  hashPlace: 1668,
  createdAt: "2026-05-26T13:19:53.275Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
