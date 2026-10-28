import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedMendersBondMagicDamage = {
  id: "019e6471-15b0-7bf4-85d7-2a2cbd4b66b5",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-menders-bond-magic-damage",
  title: "Magical Bond",
  key: "scribed-menders-bond-magic-damage",
  baseName: "Mender's Bond",
  description:
    "Grants the ally magical thorns which deal 214 Magic Damage to attackers, scaling off the ally's stats.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoAbilityId: 217285,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "temper-grimoire/menders-bond",
  hashPlace: 1657,
  createdAt: "2026-05-26T13:19:53.264Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
