import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedVaultDiseaseDamage = {
  id: "019e6471-15ed-7bb3-ae07-0afe5b5e3694",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-vault-disease-damage",
  title: "Pestilent Vault",
  key: "scribed-vault-disease-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Disease Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoAbilityId: 214960,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/disease-damage",
  grimoireId: "temper-grimoire/vault",
  hashPlace: 1722,
  createdAt: "2026-05-26T13:19:53.325Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
