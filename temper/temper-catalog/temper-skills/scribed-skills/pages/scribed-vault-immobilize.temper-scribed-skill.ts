import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultImmobilize = {
  id: "019e6471-15f0-760c-8c51-b83797d8cb4c",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-immobilize",
  title: "Binding Vault",
  key: "scribed-vault-immobilize",
  baseName: "Vault",
  description:
    "Deals 870 Physical Damage to enemies and immobilizes them for 3 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 214974,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "immobilize",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
