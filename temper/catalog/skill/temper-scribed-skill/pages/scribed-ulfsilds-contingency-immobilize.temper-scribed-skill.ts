import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedUlfsildsContingencyImmobilize = {
  id: "019e6471-15e8-7ffd-b9dc-cb84443835ba",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-immobilize",
  title: "Binding Contingency",
  key: "scribed-ulfsilds-contingency-immobilize",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 958 Magic Damage to enemies and immobilizes them for 4 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoAbilityId: 240148,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/immobilize",
  grimoireId: "temper-grimoire/ulfsilds-contingency",
  hashPlace: 1717,
  createdAt: "2026-05-26T13:19:53.320Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
