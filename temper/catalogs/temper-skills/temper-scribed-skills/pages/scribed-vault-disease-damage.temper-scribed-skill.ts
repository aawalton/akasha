import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultDiseaseDamage = {
  id: "019e6471-15ed-7bb3-ae07-0afe5b5e3694",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-disease-damage",
  title: "Pestilent Vault",
  key: "scribed-vault-disease-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Disease Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 214960,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "disease-damage",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
