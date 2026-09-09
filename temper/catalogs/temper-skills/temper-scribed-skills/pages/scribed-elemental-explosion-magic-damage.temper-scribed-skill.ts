import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionMagicDamage = {
  id: "019e6471-15a7-7ecc-81c0-e8f719a44989",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-magic-damage",
  title: "Magical Explosion",
  key: "scribed-elemental-explosion-magic-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Magic Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217228,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
