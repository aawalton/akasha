import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultFlameDamage = {
  id: "019e6471-15ee-7a37-b038-957bc4b4bb8b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-flame-damage",
  title: "Fiery Vault",
  key: "scribed-vault-flame-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Flame Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 214978,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "flame-damage",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
