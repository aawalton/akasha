import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSmashPhysicalDamage = {
  id: "019e6471-15bf-78a6-a27d-ba04ff92a4a2",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-smash-physical-damage",
  title: "Sundering Smash",
  key: "scribed-smash-physical-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Physical Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoAbilityId: 217178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/physical-damage",
  grimoireId: "temper-grimoire/smash",
  hashPlace: 1673,
  createdAt: "2026-05-26T13:19:53.279Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
