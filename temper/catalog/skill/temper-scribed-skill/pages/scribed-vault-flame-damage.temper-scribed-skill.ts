import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedVaultFlameDamage = {
  id: "019e6471-15ee-7a37-b038-957bc4b4bb8b",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-vault-flame-damage",
  title: "Fiery Vault",
  key: "scribed-vault-flame-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Flame Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoAbilityId: 214978,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/flame-damage",
  grimoireId: "temper-grimoire/vault",
  hashPlace: 1723,
  createdAt: "2026-05-26T13:19:53.326Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
